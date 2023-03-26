import { Aluno } from 'src/aluno/entity/aluno.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  Timestamp,
} from 'typeorm';
import { Livro } from '../../livro/entity/livro.entity';

@Entity({ name: 'livro_locado', orderBy: { dtCriacao: 'DESC' } })
export class LivroLocado extends AbstractEntity {
  @Column({ name: 'status_locacao' })
  statusLocacao: number;

  @CreateDateColumn({ name: 'dt_locacao', type: 'timestamp' })
  dtLocacao: Timestamp;

  @CreateDateColumn({ name: 'dt_renovacao' })
  dtRenovacao: Timestamp;

  @CreateDateColumn({ name: 'dt_vencimento' })
  dtVencimento: Timestamp;

  @Column({ name: 'renovacao' }) //quantas vezes a locação foi renovada
  renovacao: number;

  @Column({ name: 'livro_locado', type: 'int' })
  @ManyToOne(() => Livro, (livro) => livro.idPrivado)
  livroLocado: Livro;

  @Column({ name: 'aluno_locador', type: 'int' })
  @ManyToOne(() => Aluno, (aluno) => aluno.idPrivado)
  alunoLocador: Aluno;
}
