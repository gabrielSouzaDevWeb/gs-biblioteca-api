import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Timestamp } from 'typeorm/driver/mongodb/typings';
import { AbstractEntity, AlunoSalas, Emprestimo } from '.';
import { IAbstractColumns } from '../types/abstract-columns.type';

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
  @JoinColumn({ name: 'emprestimos', referencedColumnName: 'idPrivado' })
  emprestimos: Emprestimo[];

  constructor(aluno: Partial<Aluno>) {
    super(
      new AbstractEntity({
        idPrivado: aluno?.idPrivado,
        idPublico: aluno?.idPublico,
        dtCriacao: aluno?.dtCriacao,
        dtAlteracao: aluno?.dtAlteracao,
        dtDeletado: aluno?.dtAlteracao,
      } as Partial<AbstractEntity>),
    );
    this.nome = aluno?.nome;
    this.matricula = aluno?.matricula;
    this.registro = aluno?.registro;
    this.rua = aluno?.rua;
    this.numero = aluno?.numero;
    this.complemento = aluno?.complemento;
    this.bairro = aluno?.bairro;
    this.cidade = aluno?.cidade;
    this.uf = aluno?.uf;
    this.cep = aluno?.cep;
    this.email = aluno?.email;
    this.tel = aluno?.tel;
    this.telResponsavel = aluno?.telResponsavel;
    this.salas = aluno?.salas;
    this.emprestimos = aluno?.emprestimos;
  }
  idPrivado: number;
  idPublico: string;
  dtCriacao: string | Timestamp | Date;
  dtAlteracao: string | Timestamp | Date;
  dtDeletado: string | Timestamp | Date;
}
