import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Livro } from 'src/livro/entity/livro.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'livro_locado', orderBy: { dtCriacao: 'DESC' } })
export class LivroLocado extends AbstractEntity {
  @Column({ name: 'status_locacao' })
  statusLocacao: number;

  @CreateDateColumn({ name: 'dt_locacao' })
  dtLocacao: string;

  @CreateDateColumn({ name: 'dt_renovacao' })
  dtRenovacao: string;

  @CreateDateColumn({ name: 'dt_vencimento' })
  dtVencimento: string;

  @Column({ name: 'renovacoes' }) //quantas vezes a locação foi renovada
  renovacao: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.livrosLocados)
  @JoinColumn({ name: 'id_privado' })
  aluno: Aluno;

  @ManyToOne(() => Livro, (livro) => livro.locacoes)
  @JoinColumn({ name: 'id_privado' })
  livro: Livro;
}
