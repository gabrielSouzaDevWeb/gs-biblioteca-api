import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'aluno', orderBy: { dtCriacao: 'DESC' } })
export class Aluno extends AbstractEntity {
  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'matricula' })
  matricula: number;

  @Column({ name: 'registro' })
  registro: string;

  @Column({ name: 'sala', type: 'int' })
  sala: number;

  // @ManyToOne(() => Sala, (sala) => sala.idPrivado)
  // rsala: Sala;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'tel' })
  tel: string;

  @Column({ name: 'tel_responsavel' })
  telResponsavel: string;

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

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'cep' })
  cep: number;
}
