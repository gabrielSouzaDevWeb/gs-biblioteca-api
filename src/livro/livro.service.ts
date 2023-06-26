import { BadRequestException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { CriarLivroDto } from 'src/common/dto/criar-livro.dto';
import { EmprestimoLivros } from 'src/common/entity';
import { LIVRO_EMPRESTADO_STATUS } from 'src/common/enum/livro-emprestado.enum';
import { EntityManager, Repository } from 'typeorm';
import { AtualizarLivroDto } from '../common/dto/atualizar-livro.dto';
import { Livro } from '../common/entity/livro.entity';
import { ILivro } from '../common/interfaces/livro.interface';

@Injectable()
export class LivroService {
  constructor(
    @Inject('LIVRO_REPOSITORY')
    private livroRepository: Repository<Livro>,
  ) {}

  async consultarLivro(query: {
    [key: string]: string | number;
  }): Promise<{ result: Array<ILivro>; count: number } | any> {
    try {
      const camposConsultadosComILike: string[] = [
        'nomLivro',
        'nomAutor',
        'categoria',
        'qntdPaginas',
        'estado',
        'registro',
        'idPublico',
      ];
      const paginacao = ['page', 'all', 'take'];
      const livros = await this.livroRepository.createQueryBuilder('livro');

      for (const key in query) {
        if (camposConsultadosComILike.includes(key)) {
          livros.andWhere(`livro.${key} ilike '%${query[key]}%'`);
          continue;
        }
        if (paginacao.includes(key)) {
          const paginationOptions = {
            //TODO: implementar regra do all ou remover
            [`page`]: livros.skip(
              Number(
                ((Number(query['page']) as number) - 1) *
                  Number(query['take'] as number),
              ) as number,
            ),
            [`take`]: livros.take(Number(query['take'])),
          };
          paginationOptions[key];
          continue;
        }
        livros.andWhere(`livro.${key} = ${query[key]}`);
      }
      const result = await livros.getMany();
      const count = await livros.getCount();
      return { result, count };
    } catch (error) {
      throw new Error(error);
    }
  }

  async atualizarLivro(idPrivado: number, livro: AtualizarLivroDto) {
    const { idPrivado: id, idPublico, ...livroAtualizar } = livro;
    try {
      /**
       * TODO: Regra para atualizar livro, levar em conta os que já estão emprestados
       */
      const repository = this.livroRepository.manager;

      await repository.transaction(async (transaction: EntityManager) => {
        const emprestimoLivros = await transaction
          .getRepository(EmprestimoLivros)
          .createQueryBuilder('emprestimoLivros');
        const emprestimos = await emprestimoLivros
          .where('emprestimoLivros.idLivroEmprestado = :idPrivado', {
            idPrivado,
          })
          .andWhere(
            'emprestimoLivros.statusLocacao in (:...arrStatusIndisponiveis)',
            {
              arrStatusIndisponiveis: [
                LIVRO_EMPRESTADO_STATUS.EMPRESTADO,
                LIVRO_EMPRESTADO_STATUS.EMPRESTADO_RENOVADO,
                LIVRO_EMPRESTADO_STATUS.EM_ATRASO,
              ],
            },
          )
          .getMany();
        if (livro.unidades < emprestimos.length) {
          throw new BadRequestException(
            'Não é possível remover uma exemplar emprestado',
          );
        }
        await transaction
          .getRepository(Livro)
          .update(idPrivado, livroAtualizar);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async cadastrar<I>(livro: CriarLivroDto, req): Promise<I> {
    try {
      const livroExiste: boolean = await this.verificarLivroCriarExiste(livro);
      if (livroExiste) {
        throw new BadRequestException(
          'Já existe livro cadastrado com esse nome!',
        );
      }
      let livroCriado;
      await this.livroRepository
        .save(livro)
        .then((livro) => {
          livroCriado = livro;
          this.adicionarIdPublico(livro);
        })
        .catch((err) => {
          throw new BadRequestException(err);
        });

      return livroCriado;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verificarLivroCriarExiste(livro: CriarLivroDto): Promise<boolean> {
    const nomLivroEncontrado: ILivro = await this.consultarLivroPorChaveValor(
      'nomLivro',
      livro.nomLivro,
    );
    return !!nomLivroEncontrado;
  }

  async adicionarIdPublico(livro: ILivro): Promise<void> {
    if (livro.idPrivado) {
      const idPublico: string = String(livro.idPrivado);
      await this.livroRepository.update(livro.idPrivado, {
        idPublico,
        dtAlteracao: null,
      });
      return;
    }
    //TODO:estratégia para adicionar idpublico antes de criar o registro no banco
  }

  public async consultarLivroPorChaveValor(
    chave: string,
    valor: any,
  ): Promise<ILivro> {
    return (await this.livroRepository.findOneBy({
      [chave]: valor,
    })) as unknown as ILivro;
  }

  async deletar(idPrivado: number): Promise<void> {
    /**
     * TODO: regra para deletar livro, levar em conta os que já estão alugados.
     */
    const repository = this.livroRepository.manager;

    await repository.transaction(async (transaction: EntityManager) => {
      const emprestimoLivros = await transaction
        .getRepository(EmprestimoLivros)
        .createQueryBuilder('emprestimoLivros');
      const emprestimos = await emprestimoLivros
        .where('emprestimoLivros.idLivroEmprestado = :idPrivado', {
          idPrivado,
        })
        .andWhere(
          'emprestimoLivros.statusLocacao in (:...arrStatusIndisponiveis)',
          {
            arrStatusIndisponiveis: [
              LIVRO_EMPRESTADO_STATUS.EMPRESTADO,
              LIVRO_EMPRESTADO_STATUS.EMPRESTADO_RENOVADO,
              LIVRO_EMPRESTADO_STATUS.EM_ATRASO,
            ],
          },
        )
        .getMany();
      if (emprestimos.length !== 0) {
        throw new BadRequestException(
          `Não é possível remover livro que possua ${
            emprestimos.length === 1 ? 'exemplar' : 'exemplares'
          } emprestados!`,
        );
      }
      await this.livroRepository.softDelete(idPrivado);
    });
  }
}
