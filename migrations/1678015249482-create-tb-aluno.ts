import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbAluno1678015249482 implements MigrationInterface {
  private tableName: string = 'aluno';

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

          { name: 'municipio', type: 'int', isNullable: false },
          { name: 'biblioteca', type: 'int', isNullable: false },
          { name: 'estado', type: 'int', isNullable: false },

          { name: 'nome', type: 'varchar(255)', isNullable: false },
          { name: 'matricula', type: 'varchar(255)', isNullable: true },
          { name: 'sala', type: 'int', isNullable: true },
          { name: 'endereco', type: 'int', isNullable: false },
          { name: 'contato', type: 'int', isNullable: false },
          { name: 'registro', type: 'int', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
