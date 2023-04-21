import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbLivro1678544145136 implements MigrationInterface {
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
            default: `nextval(1)`,
            isNullable: false,
            isUnique: true,
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
          // { name: 'municipio', type: 'int', isNullable: false },
          // { name: 'biblioteca', type: 'int', isNullable: false },
          // { name: 'estado', type: 'int', isNullable: false },

          { name: 'nom_livro', type: 'varchar(255)', isNullable: false },
          { name: 'nom_autor', type: 'varchar(255)', isNullable: false },
          { name: 'categoria', type: 'varchar(255)', isNullable: false },
          { name: 'estante', type: 'varchar(255)', isNullable: false },
          { name: 'prateleira', type: 'varchar(255)', isNullable: false },
          { name: 'qntd_paginas', type: 'int', isNullable: false },
          { name: 'unidades', type: 'int', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
