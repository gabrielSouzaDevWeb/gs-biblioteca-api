import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './../../shared/abstract.entity';

// import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'endereco', orderBy: { dtCriacao: 'DESC' } })
export class Endereco extends AbstractEntity {
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
}
