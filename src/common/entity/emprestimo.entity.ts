import { Aluno } from 'src/common/entity/aluno.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IAbstractColumns } from '../types/abstract-columns.type';
import { AbstractEntity } from './abstract.entity';
import { EmprestimoLivros } from './livro-emprestado.entity';

@Entity({ name: 'emprestimo', orderBy: { dtCriacao: 'DESC' } })
export class Emprestimo extends AbstractEntity implements IAbstractColumns {
  @Column({ name: 'id_aluno' })
  idAluno: number;

  @Column({ name: 'id_emprestimo_livros' })
  idEmprestimoLivros: number;

  @Column({ name: 'status' })
  status: number;

  //FIXME: qntd_livros_alugados
  @Column({ name: 'qntd_livros_alugados' })
  qntdLivrosAlugados: number;

  // @OneToMany(() => AlunoSalas, (alunoSalas) => alunoSalas.idPrivado)
  // @JoinColumn({ name: 'id_sala', referencedColumnName: 'id_privado' })
  // sala: Sala;

  //TODO: trocar para ano_letivo
  // @Column({ name: 'exercicio' })
  // exercicio: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.emprestimos)
  @JoinColumn({
    name: 'id_aluno',
    referencedColumnName: 'idPrivado',
  })
  aluno?: Aluno;

  @OneToMany(
    () => EmprestimoLivros,
    (emprestimoLivros) => emprestimoLivros.emprestimo,
  )
  @JoinColumn({ name: 'livroEmprestado', referencedColumnName: 'idPrivado' })
  livrosEmprestado: EmprestimoLivros[];
}
