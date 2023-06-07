import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AlunoService } from 'src/aluno/aluno.service';
import { Aluno, Livro } from 'src/common/entity';
import { Emprestimo } from 'src/common/entity/emprestimo.entity';
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
      // console.log(result);
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
    idPrivadoLivro: number,
  ): Promise<any> {
    //TODO: Criar emprestimo
    //TODO: Relacionar emprestimo com aluno
    //TODO: Relacionar livro com emprestimo na tabela emprestimos-livros (many-to-many)
    //TODO: Criar isso tudo dentro de uma transaction
    const repository = this.emprestimoRepository.manager;

    const retorno = await repository.transaction(
      async (transactionManager: EntityManager) => {
        const livro = await transactionManager
          .getRepository(Livro)
          .find({ where: { idPrivado: idPrivadoLivro } });
        // const livro = await this.livroService.consultarLivroPorChaveValor(
        //   'idPrivado',
        //   idPrivadoLivro,
        // );
        // const aluno = await this.alunoService.consultarAlunoPorChaveValor(
        //   'idPrivado',
        //   idPrivadoAluno,
        // );
        const aluno = await transactionManager
          .getRepository(Aluno)
          .find({ where: { idPrivado: idPrivadoAluno } });
        return { livro, aluno };
      },
    );

    console.log(retorno);
    return retorno;
  }
}
