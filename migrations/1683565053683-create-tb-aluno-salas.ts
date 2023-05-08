import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbAlunoSalas1683565053683 implements MigrationInterface {
  private tableName = 'aluno_salas';
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
          {
            name: 'id_aluno',
            type: 'int',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'id_sala',
            type: 'int',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'exercicio',
            type: 'int',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'situacao',
            type: 'int',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
