import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { LivroLocado } from '../../livro_locado/entity/livro-locado.entity';

@Entity({ name: 'livro', orderBy: { dtCriacao: 'DESC' } })
export class Livro extends AbstractEntity {
  @Column({ name: 'nom_livro' })
  nomLivro: string;

  @Column({ name: 'nom_autor' })
  nomAutor: string;

  @Column({ name: 'categoria' })
  categoria: string;

  @Column({ name: 'estante' })
  estante: string;

  @Column({ name: 'prateleira' })
  prateleira: string;

  @Column({ name: 'qntd_paginas' })
  qntdPaginas: number;

  @Column({ name: 'unidades' })
  unidades: number;

  @OneToMany(() => LivroLocado, (livroLocado) => livroLocado.idPrivado)
  locacoes: LivroLocado[];
}
