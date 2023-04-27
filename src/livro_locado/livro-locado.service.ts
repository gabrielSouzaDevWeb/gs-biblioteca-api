import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Livro } from 'src/livro/entity/livro.entity';
import { Repository } from 'typeorm';
import { LivroLocado } from './entity/livro-locado.entity';

@Injectable()
export class LivroLocadoService {
  constructor(
    @Inject('LIVRO_REPOSITORY') private livroRepository: Repository<Livro>,
    @Inject('ALUNO_REPOSITORY') private alunoRepository: Repository<Aluno>,
    @Inject('LIVRO_LOCADO_REPOSITORY')
    private livroLocadoRepository: Repository<LivroLocado>,
  ) {}

  async alugarLivro(idPrivadoAluno: number, idPrivadoLivro: number) {
    try {
      const aluno = await this.alunoRepository.findOne({
        where: { idPrivado: idPrivadoAluno },
      });
      const livro = await this.livroRepository.findOne({
        where: { idPrivado: idPrivadoLivro },
      });
      /**
       * TODO: verificar se o aluno existe.
       * TODO: verificar quantos livros o aluno tem com o status aluguel ativo.
       * TODO: verificar se o aluno já excedeu a quantidade máxima de livros locados.
       * TODO: verificar se o aluno não possui nenhuma pendência.(livros com o aluguel vencido)
       * TODO: verificar se o livro existe.
       * TODO: verificar se o livro está disponivel em estoque
       */

      // TODO: melhorar essa parte do código
      console.log({ aluno, livro });
      const livroLocado = new LivroLocado();
      livroLocado.aluno = aluno;
      livroLocado.livro = livro;
      livroLocado.statusLocacao = 1; // 1 = alugado
      livroLocado.livroLocado = livro.idPrivado;
      livroLocado.alunoLocador = aluno.idPrivado;
      livroLocado.dtLocacao = new Date();
      livroLocado.dtVencimento = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias para devolução
      livroLocado.renovacao = 0;

      const locacao = await this.livroLocadoRepository.save(livroLocado);
      console.log(locacao);
      return locacao;
    } catch (error) {
      console.log(error);
    }
  }
}
