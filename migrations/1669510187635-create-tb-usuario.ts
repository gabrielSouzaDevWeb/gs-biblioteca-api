import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbUsuario1669510187635 implements MigrationInterface {
  tableName: string = 'usuarios';
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
            isNullable: false,
          },
          { name: 'id_publico', type: 'int', isNullable: true },
          { name: 'nome', type: 'varchar(128)', isNullable: true },
          { name: 'cargo', type: 'string', isNullable: true },
          { name: 'nivel_acesso', type: 'int', isNullable: true },
          { name: 'email', type: 'varchar(512)', isNullable: false },
          { name: 'telefone', type: 'varchar(512)', isNullable: true },
          { name: 'senha', type: 'varchar(32)', isNullable: false },
          {
            name: 'dt_criacao',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'dt_alteracao',
            type: 'timestamp',
            onUpdate: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
