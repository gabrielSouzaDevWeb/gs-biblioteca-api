import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbEndereco1679703823764 implements MigrationInterface {
  private tableName: string = 'endereco';
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

          { name: 'municipio', type: 'int', isNullable: false },

          { name: 'biblioteca', type: 'int', isNullable: false },
          { name: 'estado', type: 'int', isNullable: false },

          {
            name: 'dt_deletado',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'rua',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'complemento',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'cidade',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'uf',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar(8)',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
