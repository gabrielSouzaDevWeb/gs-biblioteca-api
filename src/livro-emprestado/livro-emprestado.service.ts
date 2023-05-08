import { BadGatewayException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Livro } from 'src/livro/entity/livro.entity';
import { LIVRO_EMPRESTADO_STATUS } from 'src/shared/enum/livro-emprestado.enum';
import { Repository } from 'typeorm';
import { LivroEmprestado } from './entity/livro-emprestado.entity';
import { ILivroEmprestado } from './interface/livro-emprestado.interface';

@Injectable()
export class LivroEmprestadoService {
  constructor(
    @Inject('LIVRO_REPOSITORY') private livroRepository: Repository<Livro>,
    @Inject('ALUNO_REPOSITORY') private alunoRepository: Repository<Aluno>,
    @Inject('LIVRO_EMPRESTADO_REPOSITORY')
    private livroEmprestadoRepository: Repository<LivroEmprestado>,
  ) {}

  async getLivrosEmprestadosPorIdPrivadoAluno(
    idPrivado: number,
  ): Promise<ILivroEmprestado[]> {
    const livrosEmprestados = await this.livroEmprestadoRepository.find({
      where: { idAluno: idPrivado },
      relations: ['livro'],
    });
    const livroEmprestadoMaped = livrosEmprestados.map((livrosEmprestado) => {
      const { livro, ...emprestado } = livrosEmprestado;
      return {
        ...emprestado,
        nomLivro: livro.nomLivro,
        categoria: livro.categoria,
        nomAutor: livro.nomAutor,
      };
    });

    return livroEmprestadoMaped;
  }

  async alugarLivro(
    idPrivadoAluno: number,
    idPrivadoLivro: number,
  ): Promise<ILivroEmprestado> {
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

      if (livro.unidades === livro.unidadesEmprestadas) {
        throw new BadGatewayException(
          'Não há unidades desse livro disponível no momento.',
        );
      }

      /**
      
       * TODO: verificar quantos livros o aluno tem com o status aluguel ativo.
       * TODO: verificar se o aluno já excedeu a quantidade máxima de livros emprestados.
       * TODO: verificar se o aluno não possui nenhuma pendência.(livros com o aluguel vencido)
       * TODO: verificar se o livro existe.
       * TODO: verificar se o livro está disponivel em estoque
       */

      // TODO: melhorar essa parte do código
      const livroEmprestado: ILivroEmprestado = {
        aluno: aluno,
        livro: livro,
        statusLocacao: LIVRO_EMPRESTADO_STATUS.EMPRESTADO, // 1 : emprestado
        livroEmprestado: livro.idPrivado,
        idAluno: aluno.idPrivado,
        dtLocacao: new Date(),
        dtVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias para devolução
        renovacao: 0,
      };

      const locacao = await this.livroEmprestadoRepository.save(
        livroEmprestado,
      );

      return locacao;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
