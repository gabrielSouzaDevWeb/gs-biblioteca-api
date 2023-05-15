import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { EmprestimoLivros } from './livro-emprestado.entity';

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
  qntdPaginas: string;

  @Column({ name: 'unidades' })
  unidades: string;
  @Column({ name: 'unidades_alugados' })
  unidadesEmprestadas: string;

  //TODO: relaçãop com livro_locado

  @OneToMany(
    () => EmprestimoLivros,
    (emprestimoLivros) => emprestimoLivros.livro,
  )
  @JoinColumn({ name: 'id_privado' })
  locacoes: EmprestimoLivros[];
}