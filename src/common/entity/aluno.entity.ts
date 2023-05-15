import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { AlunoSalas } from 'src/common/entity/aluno-salas.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IAbstractColumns } from '../types/abstract-columns.type';
import { Emprestimo } from 'src/common/entity/emprestimo.entity';

@Entity({ name: 'aluno', orderBy: { dtCriacao: 'DESC' } })
export class Aluno extends AbstractEntity implements IAbstractColumns {
  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'matricula' })
  matricula: string;

  @Column({ name: 'registro' })
  registro: string;

  @Column({ name: 'rua' })
  rua: string;

  @Column({ name: 'numero' })
  numero: number;

  @Column({ name: 'complemento' })
  complemento: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'cidade' })
  cidade: string;

  @Column({ name: 'uf' })
  uf: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'tel' })
  tel: string;

  @Column({ name: 'tel_responsavel' })
  telResponsavel: string;

  @OneToMany(() => AlunoSalas, (alunoSalas) => alunoSalas.aluno)
  @JoinColumn({ name: 'salas', referencedColumnName: 'idAluno' })
  salas: AlunoSalas[];

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.aluno)
  @JoinColumn({ name: 'emprestimos', referencedColumnName: 'idAluno' })
  emprestimos: Emprestimo[];
}
