import { Endereco } from 'src/endereco/entity/endereco.entity';
import { AbstractEntity } from 'src/shared/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { LivroLocado } from '../../livro_locado/entity/livro-locado.entity';
import { Contato } from './../../contato/entity/contato.entity';
import { Sala } from './../../sala/entity/sala.entity';

@Entity({ name: 'aluno', orderBy: { dtCriacao: 'DESC' } })
export class Aluno extends AbstractEntity {
  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'matricula' })
  matricula: string;

  @Column({ name: 'registro' })
  registro: number;

  @Column({ name: 'sala', type: 'int' })
  @ManyToOne(() => Sala, (sala) => sala.idPrivado)
  sala: Sala;

  @Column({ name: 'endereco', type: 'int' })
  @OneToOne(() => Endereco, (endereco) => endereco.idPrivado)
  @JoinColumn()
  endereco: Endereco;

  // @Column({ name: 'contato' })
  @OneToOne(() => Contato, (contato) => contato.idPrivado)
  @JoinColumn()
  contato: Contato;

  @Column({ name: 'livro_locado', type: 'int' })
  @OneToMany(() => LivroLocado, (livroLocado) => livroLocado.alunoLocador)
  locacoes: LivroLocado[];
}
