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
  dtCriacao: string | Timestamp | Date;

  @UpdateDateColumn({ name: 'dt_alteracao' })
  dtAlteracao: string | Timestamp | Date;

  @DeleteDateColumn({ name: 'dt_deletado' })
  dtDeletado: string | Timestamp | Date;

  constructor(abstract: Partial<AbstractEntity>) {
    this.idPrivado = abstract?.idPrivado;
    this.idPublico = abstract?.idPublico;
    this.dtCriacao = abstract?.dtCriacao;
    this.dtAlteracao = abstract?.dtAlteracao;
    this.dtDeletado = abstract?.dtDeletado;
  }
}
