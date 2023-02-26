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
            // isNullable: false,
          },
          { name: 'id_publico', type: 'int', isNullable: true },
          { name: 'nome', type: 'varchar(128)', isNullable: false },
          { name: 'cargo', type: 'varchar(16)', isNullable: false },
          { name: 'nivel_acesso', type: 'int', isNullable: false },
          { name: 'municipio', type: 'varchar(128)', isNullable: false },
          { name: 'biblioteca', type: 'varchar(255)', isNullable: false },
          { name: 'estado', type: 'varchar(255)', isNullable: false },
          { name: 'uf', type: 'varchar(2)', isNullable: false },
          { name: 'email', type: 'varchar(512)', isNullable: false },
          { name: 'telefone', type: 'varchar(512)', isNullable: false },
          { name: 'senha', type: 'varchar(32)', isNullable: false },
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
          { name: 'logado', type: 'boolean', default: false, isNullable: false }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { }
}
