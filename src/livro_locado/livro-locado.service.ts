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

      const livroLocado = new LivroLocado();
      livroLocado.aluno = aluno;
      livroLocado.livro = livro;
      livroLocado.statusLocacao = 1; // 1 = alugado
      livroLocado.dtLocacao = new Date(new Date()).toDateString();
      // livroLocado.dtRenovacao = null;
      livroLocado.dtVencimento = new Date(new Date()).toDateString(); // 7 dias para devolução
      // livroLocado.renovacao = 0;

      const locacao = await this.livroLocadoRepository.save(livroLocado);
      console.log(locacao);
      return locacao;
    } catch (error) {
      console.log(error);
    }
  }
}
