import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, CreateDateColumn, Entity, Timestamp } from 'typeorm';

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
}
