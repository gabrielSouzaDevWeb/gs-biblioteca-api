import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { IAbstractColumns } from '../types/abstract-columns.type';

@Entity()
export class AbstractEntity implements IAbstractColumns {
  @PrimaryGeneratedColumn({ name: 'id_privado' })
  idPrivado: number;

  @Column({ name: 'id_publico' })
  idPublico: string;

  @CreateDateColumn({ name: 'dt_criacao' })
  dtCriacao: Timestamp;

  @UpdateDateColumn({ name: 'dt_alteracao' })
  dtAlteracao: Timestamp;

  @DeleteDateColumn({ name: 'dt_deletado' })
  dtDeletado: Timestamp;
}
