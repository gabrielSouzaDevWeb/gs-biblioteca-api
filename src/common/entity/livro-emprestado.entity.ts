import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Livro } from 'src/common/entity/livro.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Emprestimo } from './emprestimo.entity';

@Entity({ name: 'emprestimo_livros', orderBy: { dtCriacao: 'DESC' } })
export class EmprestimoLivros extends AbstractEntity {
  @Column({ name: 'status_emprestimo' })
  statusLocacao: number;

  @Column({ name: 'dt_locacao' })
  dtLocacao: Date;

  @CreateDateColumn({ name: 'dt_renovacao' })
  dtRenovacao: Date;

  @Column({ name: 'dt_vencimento' })
  dtVencimento: Date;

  @Column({ name: 'renovacoes' }) //quantas vezes a locação foi renovada
  renovacao: number;

  // @ManyToOne(() => Aluno, (aluno) => aluno.idPrivado)
  // @JoinColumn({ name: 'aluno_locador' })
  // aluno: Aluno;

  // @ManyToOne(() => Livro, (livro) => livro.locacoes)
  // @JoinColumn({ name: 'id_livro_emprestado' })
  // livro: Livro;

  @Column({ name: 'id_livro_emprestado' })
  idLivroEmprestado: number; //

  @Column({ name: 'id_emprestimo' })
  idEmprestimo: number;

  // @Column({ name: 'aluno_locador' })
  // idAluno: number;

  @ManyToOne(() => Emprestimo, (emprestimo) => emprestimo.livrosEmprestado)
  @JoinColumn({ name: 'id_emprestimo', referencedColumnName: 'idPrivado' })
  emprestimo: Emprestimo;

  @ManyToOne(() => Livro, (livro) => livro.emprestimoLivros)
  @JoinColumn({
    name: 'id_livro_emprestado',
    referencedColumnName: 'idPrivado',
  })
  livro: Livro;
}
