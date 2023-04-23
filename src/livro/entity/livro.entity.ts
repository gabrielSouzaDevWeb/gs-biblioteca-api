import { AbstractEntity } from 'src/shared/abstract.entity';
import { Column, Entity } from 'typeorm';

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

  /*
   * TODO: Garatir que a coluna será tratada como número para
   * para fins de consulta e filtros
   */
  @Column({ name: 'qntd_paginas' })
  qntdPaginas: number;

  @Column({ name: 'unidades' })
  unidades: number;

  //TODO: relaçãop com livro_locado

  // @OneToMany(() => LivroLocado, (livroLocado) => livroLocado.idPrivado)
  // locacoes: LivroLocado[];
}
