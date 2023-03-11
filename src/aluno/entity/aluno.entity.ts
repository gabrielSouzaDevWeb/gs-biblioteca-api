import { AbstractEntity } from 'src/shared/abstract.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'aluno', orderBy: { dtCriacao: 'DESC' } })
export class Aluno extends AbstractEntity {
  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'matricula' })
  matricula: string;

  @Column({ name: 'sala' })
  sala: number;

  @Column({ name: 'endereco' })
  endereco: number;

  @Column({ name: 'contato' })
  contato: number;

  @Column({ name: 'registro' })
  registro: number;
}
