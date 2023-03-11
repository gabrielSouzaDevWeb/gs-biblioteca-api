import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbSala1678541497444 implements MigrationInterface {
  private tableName = 'sala';
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
          {
            name: 'dt_deletado',
            type: 'timestamp',
            isNullable: true,
          },

          { name: 'municipio', type: 'int', isNullable: false },

          { name: 'biblioteca', type: 'int', isNullable: false },
          { name: 'estado', type: 'int', isNullable: false },

          { name: 'ano', type: 'varchar(16)', isNullable: false },
          { name: 'nom_sala', type: 'varchar(16)', isNullable: true },
          { name: 'identificador', type: 'varchar(16)', isNullable: false },
          { name: 'curso', type: 'varchar(255)', isNullable: false },
          { name: 'num_sala', type: 'varchar(255)', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
