import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IAbstractColumns } from '../types/abstract-columns.type';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'emprestimo', orderBy: { dtCriacao: 'DESC' } })
export class Emprestimo extends AbstractEntity implements IAbstractColumns {
  @Column({ name: 'id_aluno' })
  idAluno: number;

  @Column({ name: 'id_emprestimo_livros' })
  idEmprestimoLivro: number;

  @Column({ name: 'status' })
  status: number;

  //FIXME: qntd_livros_alugados
  @Column({ name: 'qntds_livros_alugados' })
  qntdLivrosAlugados: number;

  // @OneToMany(() => AlunoSalas, (alunoSalas) => alunoSalas.idPrivado)
  // @JoinColumn({ name: 'id_sala', referencedColumnName: 'id_privado' })
  // sala: Sala;

  //TODO: trocar para ano_letivo
  // @Column({ name: 'exercicio' })
  // exercicio: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.salas)
  @JoinColumn({
    name: 'id_emprestimo_livros',
    referencedColumnName: 'idPrivado',
  })
  aluno?: Aluno;
}
