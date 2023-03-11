import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class AbstractEntity {
  @PrimaryGeneratedColumn({ name: 'id_privado' })
  idPrivado: number;

  @Column({ name: 'id_publico' })
  idPublico: number;

  @Column({ name: 'municipio' })
  municipio: number;

  @Column({ name: 'biblioteca' })
  biblioteca: number;

  @Column({ name: 'estado' })
  estado: number;

  @CreateDateColumn({ name: 'dt_criacao' })
  dtCriacao: Timestamp;

  @UpdateDateColumn({ name: 'dt_alteracao' })
  dtAlteracao: Timestamp;

  @DeleteDateColumn({ name: 'dt_deletado' })
  dtDeletado: Timestamp;
}
