import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbContato1679779768449 implements MigrationInterface {
  private tableName: string = 'contato';
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
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'tel',
            type: 'varchar(20)',
            isNullable: true,
          },
          { name: 'tel_responsavel', type: 'varchar(20)', isNullable: true },
          { name: 'aluno', type: 'int', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
