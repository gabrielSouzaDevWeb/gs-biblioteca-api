import { Aluno } from 'src/aluno/entity/aluno.entity';
import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'sala', orderBy: { dtCriacao: 'DESC' } })
export class Sala extends AbstractEntity {
  @Column({ name: 'ano' })
  ano: string;

  @Column({ name: 'nom_sala' })
  nomSala: string;

  @Column({ name: 'identificado' })
  identificador: number;

  @Column({ name: 'curso' })
  curso: number;

  @Column({ name: 'num_sala' })
  numSala: number;

  @OneToMany(() => Aluno, (aluno) => aluno)
  alunos: Aluno[];
}
