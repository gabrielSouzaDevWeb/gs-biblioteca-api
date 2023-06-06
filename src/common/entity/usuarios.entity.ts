import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn({ name: 'id_privado' })
  idPrivado: number;

  @Column({ name: 'id_publico' })
  idPublico: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'cargo' })
  cargo: string;

  @Column({ name: 'biblioteca' })
  biblioteca: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'municipio' })
  municipio: string;

  @Column({ name: 'uf' })
  uf: string;

  @Column({ name: 'nivel_acesso' })
  nivelAcesso: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'telefone' })
  telefone: number;

  @Column({ name: 'senha' })
  senha: string;

  @CreateDateColumn({ name: 'dt_criacao' })
  dtCriacao: Timestamp;

  @UpdateDateColumn({ name: 'dt_alteracao' })
  dtAlteracao: Timestamp;

  @UpdateDateColumn({ name: 'logado' })
  logado: boolean;
}
