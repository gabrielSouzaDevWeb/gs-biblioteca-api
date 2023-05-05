import { BadGatewayException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Livro } from 'src/livro/entity/livro.entity';
import { LIVRO_LOCADO_STATUS } from 'src/shared/enum/livro-locado.enum';
import { Repository } from 'typeorm';
import { LivroLocado } from './entity/livro-locado.entity';
import { ILivroLocado } from './interface/livro-locado.interface';

@Injectable()
export class LivroLocadoService {
  constructor(
    @Inject('LIVRO_REPOSITORY') private livroRepository: Repository<Livro>,
    @Inject('ALUNO_REPOSITORY') private alunoRepository: Repository<Aluno>,
    @Inject('LIVRO_LOCADO_REPOSITORY')
    private livroLocadoRepository: Repository<LivroLocado>,
  ) {}

  async getLivrosAlugadosPorIdPrivadoAluno(
    idPrivado: number,
  ): Promise<ILivroLocado[]> {
    const livrosAlugados = await this.livroLocadoRepository.find({
      where: { alunoLocador: idPrivado },
      relations: ['livro'],
    });
    const livroLocadoMaped = livrosAlugados.map((livrosAlugado) => {
      const { livro, ...alugado } = livrosAlugado;
      return {
        ...alugado,
        nomLivro: livro.nomLivro,
        categoria: livro.categoria,
        nomAutor: livro.nomAutor,
      };
    });

    return livroLocadoMaped;
  }

  async alugarLivro(
    idPrivadoAluno: number,
    idPrivadoLivro: number,
  ): Promise<ILivroLocado> {
    try {
      const aluno = await this.alunoRepository.findOne({
        where: { idPrivado: idPrivadoAluno },
      });
      const livro = await this.livroRepository.findOne({
        where: { idPrivado: idPrivadoLivro },
      });

      if (!aluno) {
        throw new BadGatewayException('Aluno não encontrado!');
      }
      if (!livro) {
        throw new BadGatewayException('Livro não encontrado!');
      }

      if (livro.unidades === livro.unidadesAlugados) {
        throw new BadGatewayException(
          'Não há unidades desse livro disponível no momento.',
        );
      }

      /**
      
       * TODO: verificar quantos livros o aluno tem com o status aluguel ativo.
       * TODO: verificar se o aluno já excedeu a quantidade máxima de livros locados.
       * TODO: verificar se o aluno não possui nenhuma pendência.(livros com o aluguel vencido)
       * TODO: verificar se o livro existe.
       * TODO: verificar se o livro está disponivel em estoque
       */

      // TODO: melhorar essa parte do código
      const livroLocado: ILivroLocado = {
        aluno: aluno,
        livro: livro,
        statusLocacao: LIVRO_LOCADO_STATUS.LOCADO, // 1 : alugado
        livroLocado: livro.idPrivado,
        alunoLocador: aluno.idPrivado,
        dtLocacao: new Date(),
        dtVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias para devolução
        renovacao: 0,
      };

      const locacao = await this.livroLocadoRepository.save(livroLocado);

      return locacao;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
