import { Aluno } from 'src/common/entity/aluno.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IAbstractColumns } from '../types/abstract-columns.type';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'aluno_salas', orderBy: { dtCriacao: 'DESC' } })
export class AlunoSalas extends AbstractEntity implements IAbstractColumns {
  @Column({ name: 'id_aluno' })
  idAluno: number;

  @Column({ name: 'id_sala' })
  idSala: number;

  // @OneToMany(() => AlunoSalas, (alunoSalas) => alunoSalas.idPrivado)
  // @JoinColumn({ name: 'id_sala', referencedColumnName: 'id_privado' })
  // sala: Sala;

  //TODO: trocar para ano_letivo
  @Column({ name: 'ano_letivo' })
  anoLetivo: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.salas)
  @JoinColumn({ name: 'id_sala', referencedColumnName: 'idPrivado' })
  aluno?: Aluno;
}
