import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbEmprestimoLivros1683556137415
  implements MigrationInterface
{
  tableName: string = 'emprestimo_livros';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id_privado',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            // isNullable: false,
          },
          {
            name: 'id_publico',
            type: 'varchar(255)',
            isNullable: true,
            isUnique: true,
          },
          { name: 'id_livro_emprestado', type: 'int', isNullable: false },
          { name: 'id_emprestimo', type: 'int', isNullable: false },
          { name: 'status_emprestimo', type: 'int', isNullable: false },
          { name: 'dt_emprestimo', type: 'timestamp', isNullable: false },
          { name: 'dt_renovacao', type: 'timestamp', isNullable: true },
          { name: 'renovacoes', type: 'int', isNullable: false }, //quantas vezes o emprestimo foi renovada
          { name: 'dt_vencimento', type: 'timestamp', isNullable: false },
          { name: 'dt_locacao', type: 'timestamp', isNullable: false },
          {
            name: 'dt_criacao',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'dt_alteracao',
            type: 'timestamp',
            onUpdate: 'now()',
            isNullable: true,
          },
          {
            name: 'dt_deletado',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
