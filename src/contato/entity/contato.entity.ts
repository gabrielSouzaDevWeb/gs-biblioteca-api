import { Aluno } from 'src/aluno/entity/aluno.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'contato', orderBy: { dtCriacao: 'DESC' } })
export class Contato extends AbstractEntity {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'tel' })
  tel: number;

  @Column({ name: 'tel_responsavel' })
  teResponsavel: number;

  // @Column({ name: 'aluno' })
  @OneToOne(() => Aluno, (aluno) => aluno.idPrivado)
  @JoinColumn()
  aluno: Aluno;
}
