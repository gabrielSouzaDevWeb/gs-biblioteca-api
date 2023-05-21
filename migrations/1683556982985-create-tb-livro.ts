import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbLivro1683556982985 implements MigrationInterface {
  tableName: string = 'livro';

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
            // isNullable: false,
            isUnique: true,
          },
          {
            name: 'nom_livro',
            type: 'varchar(255)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'genero',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: false,
          },
          {
            name: 'classificacao',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'autor',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'editora',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'qntd_pags',
            type: 'varchar(8)',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'estante',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'prateleira',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: true,
          },
          {
            name: 'qntd',
            type: 'varchar(8)',
            isUnique: false,
            isNullable: true,
          },
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
