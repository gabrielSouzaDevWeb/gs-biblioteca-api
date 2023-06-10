import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AlunoService } from 'src/aluno/aluno.service';
import { EmprestimoLivros, Livro } from 'src/common/entity';
import { Emprestimo } from 'src/common/entity/emprestimo.entity';
import { LIVRO_EMPRESTADO_STATUS } from 'src/common/enum/livro-emprestado.enum';
import { IEmprestimo } from 'src/common/interfaces/emprestimo.interface';
import { LivroEmprestadoService } from 'src/livro-emprestado/livro-emprestado.service';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { LivroService } from './../livro/livro.service';

@Injectable()
export class EmprestimoService {
  constructor(
    @Inject('EMPRESTIMO_REPOSITORY')
    private emprestimoRepository: Repository<Emprestimo>,
    private readonly livroEmprestadoService: LivroEmprestadoService,
    private readonly livroService: LivroService,
    private readonly alunoService: AlunoService,
  ) {}

  async consultarEmprestimoIdAluno(idAluno): Promise<IEmprestimo> {
    //TODO: otimizar essa consulta
    const emprestimo: SelectQueryBuilder<Emprestimo> =
      this.emprestimoRepository.createQueryBuilder('emprestimo');
    emprestimo.leftJoinAndSelect(
      'emprestimo.livrosEmprestado',
      'livrosEmprestado',
    );
    emprestimo.leftJoinAndSelect('livrosEmprestado.livro', 'livro');

    return await emprestimo.where({ idAluno }).getMany();
  }

  async consultarEmprestimo(query: {
    [key: string]: string | number;
  }): Promise<{ result: Array<IEmprestimo>; count: number }> {
    try {
      const camposConsultadosComILike: string[] = [
        'nome',
        'email',
        'cidade',
        'complemento',
        'estado',
        'registro',
        'idPublico',
      ];
      const paginacao = ['page', 'all', 'take'];
      const emprestimos = await this.emprestimoRepository.createQueryBuilder(
        'emprestimo',
      );

      emprestimos.leftJoinAndSelect('emprestimo.aluno', 'aluno');
      emprestimos.leftJoinAndSelect(
        'emprestimo.livrosEmprestado',
        'livrosEmprestado',
      );
      emprestimos.leftJoinAndSelect('livrosEmprestado.livro', 'livro');

      for (const key in query) {
        if (camposConsultadosComILike.includes(key)) {
          emprestimos.andWhere(`emprestimo.${key} ilike '%${query[key]}%'`);
          continue;
        }
        if (paginacao.includes(key)) {
          const paginationOptions = {
            //TODO implementar regra do all ou remover
            [`page`]: emprestimos.skip(
              Number(
                ((Number(query['page']) as number) - 1) *
                  Number(query['take'] as number),
              ) as number,
            ),
            [`take`]: emprestimos.take(Number(query['take'])),
          };
          paginationOptions[key];
          continue;
        }
        emprestimos.andWhere(`emprestimo.${key} = ${query[key]}`);
      }
      const result = await emprestimos.getMany();
      const count = await emprestimos.getCount();
      return { result, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async criarEmprestimo(emprestimo: any, req): Promise<IEmprestimo> {
    try {
      const emprestimoExiste: boolean =
        await this.verificarEmprestimoCriarExiste(emprestimo);
      if (emprestimoExiste) {
        throw new BadRequestException(
          'Já existe emprestimo cadastrado com essa matricula ou com esse registro',
        );
      }
      let emprestimoCriado: IEmprestimo;
      await this.emprestimoRepository
        .save(emprestimo)
        .then((emprestimo) => {
          emprestimoCriado = emprestimo;
          this.adicionarIdPublico(emprestimo);
        })
        .catch((err) => {
          console.log(err);
          throw new BadRequestException(err);
        });

      return emprestimoCriado;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async adicionarIdPublico(emprestimo: IEmprestimo): Promise<void> {
    if (emprestimo.idPrivado) {
      const idPublico = String(emprestimo.idPrivado);
      await this.emprestimoRepository.update(emprestimo.idPrivado, {
        idPublico,
        dtAlteracao: null,
      });
      return;
    }
    //TODO:estratégia para adicionar idpublico antes de criar o registro no banco
  }

  async atualizarEmprestimo(id: number, emprestimo: any) {
    const { idPrivado, idPublico, ...emprestimoAtualizar } = emprestimo;
    try {
      return await this.emprestimoRepository.update(id, emprestimoAtualizar);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verificarEmprestimoCriarExiste(emprestimo: any): Promise<boolean> {
    try {
      const registroEmprestimoEncontrado: IEmprestimo =
        await this.consultarEmprestimoPorChaveValor(
          'matricula',
          emprestimo.matricula,
        );

      const matriculaEmprestimoEncontrado: IEmprestimo =
        await this.consultarEmprestimoPorChaveValor(
          'registro',
          emprestimo.registro,
        );
      return !!registroEmprestimoEncontrado || !!matriculaEmprestimoEncontrado;
    } catch (error) {
      new BadRequestException(error);
    }
  }

  public async consultarEmprestimoPorChaveValor(
    chave: string,
    valor: any,
  ): Promise<IEmprestimo> {
    return (await this.emprestimoRepository.findOneBy({
      [chave]: valor,
    })) as unknown as IEmprestimo;
  }

  async deletar(idPrivado: number): Promise<void> {
    await this.emprestimoRepository.softDelete(idPrivado);
  }

  async alunoAlugarlivro(
    idPrivadoAluno: number,
    idsPrivadoLivro: ReadonlyArray<number>,
  ): Promise<any> {
    const repository = this.emprestimoRepository.manager;

    const retorno = await repository.transaction(
      async (transactionManager: EntityManager) => {
        try {
          if (idsPrivadoLivro.length > 3) {
            throw new BadRequestException(
              `Não é possível pegar mais de três livros emprestado!`,
            );
          }
          const livros: Array<Livro> = await transactionManager
            .getRepository(Livro)
            .createQueryBuilder('livro')
            .where('livro.idPrivado IN (:...idsPrivadoLivro)', {
              idsPrivadoLivro,
            })
            .getMany();

          if (livros && livros.length === 0) {
            const msg: string =
              idsPrivadoLivro.length === 1
                ? `O livro não foi encontrado. Id do livro: ${idsPrivadoLivro[0]}`
                : `Os livros não foram encontrados. Id dos livro: ${idsPrivadoLivro}`;
            throw new BadRequestException(msg);
          }

          const alunoEmpretimos: Array<Emprestimo> = await transactionManager
            .getRepository(Emprestimo)
            .find({
              where: { idAluno: idPrivadoAluno },
              relations: { livrosEmprestado: true, aluno: true },
            });

          const idsPrivadosLivrosEmprestadosAluno: Array<number> = [];
          const idsLivrosEmprestados: Array<number> = [];
          const arrStatusIndisponiveis: ReadonlyArray<LIVRO_EMPRESTADO_STATUS> =
            [
              LIVRO_EMPRESTADO_STATUS.EMPRESTADO,
              LIVRO_EMPRESTADO_STATUS.EMPRESTADO_RENOVADO,
              LIVRO_EMPRESTADO_STATUS.EM_ATRASO,
            ];

          for (const alunoEmpretimo of alunoEmpretimos) {
            for (const livroEmprestado of alunoEmpretimo.livrosEmprestado) {
              if (
                [
                  LIVRO_EMPRESTADO_STATUS.EMPRESTADO,
                  LIVRO_EMPRESTADO_STATUS.EMPRESTADO_RENOVADO,
                  LIVRO_EMPRESTADO_STATUS.EM_ATRASO,
                ].includes(livroEmprestado.statusLocacao)
              ) {
                idsLivrosEmprestados.push(livroEmprestado.idPrivado);
                idsPrivadosLivrosEmprestadosAluno.push(
                  livroEmprestado.idLivroEmprestado,
                );
              }
            }
          }
          for (const idPrivadoLivroEmprestadoAluno of idsPrivadosLivrosEmprestadosAluno) {
            if (idsPrivadoLivro.includes(idPrivadoLivroEmprestadoAluno)) {
              throw new BadRequestException(
                `Não é permitido um aluno pegar emprestado mais de um exemplar do mesmo livro.`,
              );
            }
          }

          if (
            idsLivrosEmprestados &&
            idsLivrosEmprestados.length + idsPrivadoLivro.length > 3
          ) {
            throw new BadRequestException(
              `O aluno ${alunoEmpretimos[0].aluno.nome} possui ${idsLivrosEmprestados.length} livros emprestados e que ainda não devolveu.`,
            );
          }

          const emprestimoLivros: Array<EmprestimoLivros> =
            await transactionManager
              .getRepository(EmprestimoLivros)
              .createQueryBuilder('emprestimoLivros')
              .leftJoinAndSelect('emprestimoLivros.livro', 'livro')
              .where(
                'emprestimoLivros.idLivroEmprestado IN (:...idsPrivadoLivro)',
                {
                  idsPrivadoLivro,
                },
              )
              .andWhere(
                `emprestimoLivros.statusLocacao IN (:...arrStatusIndisponiveis)`,
                { arrStatusIndisponiveis },
              )
              .getMany();
          const arrLivrosIndisponiveis: Array<Livro> = [];
          if (emprestimoLivros && emprestimoLivros.length > 0) {
            for (const emprestimoLivro of emprestimoLivros) {
              for (const livro of livros) {
                if (
                  emprestimoLivros.filter(
                    (item) => item.idLivroEmprestado === livro.idPrivado,
                  ).length >= livro.unidades &&
                  emprestimoLivro.idLivroEmprestado === livro.idPrivado
                ) {
                  arrLivrosIndisponiveis.push(livro);
                }
              }
            }
          }

          const arrNomeLivros: Array<string> = arrLivrosIndisponiveis.map(
            (livro) => livro.nomLivro,
          );
          const arrNomeLivrosSemDuplicidade: Array<string> =
            arrNomeLivros.filter(
              (item, index) => arrNomeLivros.indexOf(item) === index,
            );
          if (arrNomeLivrosSemDuplicidade.length != 0) {
            const msg: string =
              arrNomeLivrosSemDuplicidade.length === 1
                ? `O livro ${arrLivrosIndisponiveis[0].nomLivro} não possui exemplar disponível no momento.`
                : `Os livros ${arrNomeLivrosSemDuplicidade.join(
                    ', ',
                  )} não possuem exemplares disponíveis no momento.`;
            throw new Error(msg);
          }

          const { generatedMaps: novosEmprestimosCriados } =
            await transactionManager.getRepository(Emprestimo).insert({
              idAluno: idPrivadoAluno,
              status: LIVRO_EMPRESTADO_STATUS.EMPRESTADO,
            } as Partial<Emprestimo>);

          const hoje = new Date();
          const dtVencimento = new Date(hoje.setDate(hoje.getDate() + 7));
          for (const livro of livros) {
            await transactionManager.getRepository(EmprestimoLivros).insert({
              idEmprestimo: novosEmprestimosCriados[0].idPrivado,
              idLivroEmprestado: livro.idPrivado,
              statusLocacao: LIVRO_EMPRESTADO_STATUS.EMPRESTADO,
              dtVencimento,
              renovacoes: 0,
            } as Partial<EmprestimoLivros>);
          }

          return { livros, novosEmprestimosCriados };
        } catch (error) {
          console.log(error, 'error');
          throw new InternalServerErrorException(error);
        }
      },
    );

    return retorno;
  }
}
