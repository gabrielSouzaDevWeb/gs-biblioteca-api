import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbAluno1680392071048 implements MigrationInterface {
  private tableName = 'aluno';

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
          },
          {
            name: 'id_publico',
            type: 'varchar(255)',
            isNullable: true,
            isUnique: true,
          },

          { name: 'nome', type: 'varchar(255)', isNullable: false },
          {
            name: 'matricula',
            type: 'varchar(255)',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'registro',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'rua',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'numero',
            type: 'varchar(8)',
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
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'tel',
            type: 'varchar(11)',
            isNullable: true,
          },
          { name: 'tel_responsavel', type: 'varchar(11)', isNullable: true },
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
