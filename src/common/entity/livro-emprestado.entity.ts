import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Timestamp,
} from 'typeorm';
import { AbstractEntity, Emprestimo, Livro } from '.';

@Entity({ name: 'emprestimo_livros', orderBy: { dtCriacao: 'DESC' } })
export class EmprestimoLivros extends AbstractEntity {
  @Column({ name: 'status_emprestimo' })
  statusLocacao: number;

  @CreateDateColumn({ name: 'dt_renovacao' })
  dtRenovacao: string | Timestamp | Date;

  @CreateDateColumn({ name: 'dt_vencimento' })
  dtVencimento: string | Timestamp | Date;

  @CreateDateColumn({ name: 'renovacoes' }) //quantas vezes a locação foi renovada
  renovacoes: number;

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
  emprestimo?: Emprestimo;

  @ManyToOne(() => Livro, (livro) => livro.emprestimoLivros)
  @JoinColumn({
    name: 'id_livro_emprestado',
    referencedColumnName: 'idPrivado',
  })
  livro: Livro;
}
