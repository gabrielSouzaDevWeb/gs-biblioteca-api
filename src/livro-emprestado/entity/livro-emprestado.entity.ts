import { Aluno } from 'src/aluno/entity/aluno.entity';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Livro } from 'src/livro/entity/livro.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'emprestimo_livros', orderBy: { dtCriacao: 'DESC' } })
export class LivroEmprestado extends AbstractEntity {
  @Column({ name: 'status_locacao' })
  statusLocacao: number;

  @Column({ name: 'dt_locacao' })
  dtLocacao: Date;

  @CreateDateColumn({ name: 'dt_renovacao' })
  dtRenovacao: Date;

  @Column({ name: 'dt_vencimento' })
  dtVencimento: Date;

  @Column({ name: 'renovacoes' }) //quantas vezes a locação foi renovada
  renovacao: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.idPrivado)
  @JoinColumn({ name: 'aluno_locador' })
  aluno: Aluno;

  @ManyToOne(() => Livro, (livro) => livro.locacoes)
  @JoinColumn({ name: 'livro_locado' })
  livro: Livro;

  @Column({ name: 'livro_locado' })
  livroLocado: number; //
  @Column({ name: 'aluno_locador' })
  idAluno: number;
}
