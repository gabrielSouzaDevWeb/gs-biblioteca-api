import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbLivro1678544145136 implements MigrationInterface {
  tableName: string = 'livro';
  public async up(queryRunner: QueryRunner): Promise<void> {
    //TODO: criar coluna unidades disponíveis
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

          // { name: 'municipio', type: 'int', isNullable: false },
          // { name: 'biblioteca', type: 'int', isNullable: false },
          // { name: 'estado', type: 'int', isNullable: false },

          { name: 'nom_livro', type: 'varchar(255)', isNullable: false },
          { name: 'nom_autor', type: 'varchar(255)', isNullable: false },
          { name: 'categoria', type: 'varchar(255)', isNullable: false },
          { name: 'estante', type: 'varchar(255)', isNullable: true },
          { name: 'prateleira', type: 'varchar(255)', isNullable: true },
          { name: 'qntd_paginas', type: 'varchar(4)', isNullable: false },
          { name: 'unidades', type: 'int', isNullable: false },
          { name: 'unidades_alugados', type: 'int', isNullable: true },

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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
