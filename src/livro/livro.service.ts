import { BadRequestException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { Livro } from '../common/entity/livro.entity';
import { AtualizarLivroDto } from './dto/livro-atualizar.dto';
import { CriarLivroDto } from './dto/livro-criar.dto';
import { ILivro } from './interface/livro.interface';

@Injectable()
export class LivroService {
  constructor(
    @Inject('LIVRO_REPOSITORY')
    private livroRepository: Repository<Livro>,
  ) {}

  async consultarLivro(query: {
    [key: string]: string | number;
  }): Promise<{ result: Array<ILivro>; count: number }> {
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

  async atualizarLivro(id: number, livro: AtualizarLivroDto) {
    const { idPrivado, idPublico, ...livroAtualizar } = livro;
    try {
      return await this.livroRepository.update(id, livroAtualizar);
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
    await this.livroRepository.softDelete(idPrivado);
  }
}
