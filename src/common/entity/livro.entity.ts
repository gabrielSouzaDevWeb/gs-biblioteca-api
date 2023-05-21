import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { EmprestimoLivros } from './livro-emprestado.entity';

@Entity({ name: 'livro', orderBy: { dtCriacao: 'DESC' } })
export class Livro extends AbstractEntity {
  @Column({ name: 'nom_livro' })
  nomLivro: string;

  @Column({ name: 'autor' })
  autor: string;

  @Column({ name: 'genero' })
  genero: string;

  @Column({ name: 'estante' })
  estante: string;

  @Column({ name: 'prateleira' })
  prateleira: string;

  /*
   * TODO: Garatir que a coluna será tratada como número para
   * para fins de consulta e filtros
   */
  @Column({ name: 'qntd_pags' })
  qntdPaginas: string;

  @Column({ name: 'qntd' })
  unidades: string;
  // @Column({ name: 'unidades_alugados' })
  // unidadesEmprestadas: string;

  //TODO: relaçãop com livro_locado

  @OneToMany(
    () => EmprestimoLivros,
    (emprestimoLivros) => emprestimoLivros.livro,
  )
  @JoinColumn({
    name: 'id_privado',
    referencedColumnName: 'id_livro_emprestado',
  })
  emprestimoLivros: EmprestimoLivros[];
}
