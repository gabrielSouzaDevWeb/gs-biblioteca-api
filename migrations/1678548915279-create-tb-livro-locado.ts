import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTbLivroLocado1678548915279 implements MigrationInterface {
  tableName: string = 'livro_locado';

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
          { name: 'livro_locado', type: 'int', isNullable: false },
          { name: 'aluno_locador', type: 'int', isNullable: false },
          { name: 'status_locacao', type: 'int', isNullable: false },
          { name: 'data_locacao', type: 'timestamp', isNullable: false },
          { name: 'data_renovacao', type: 'timestamp', isNullable: false },
          { name: 'renovacoes', type: 'int', isNullable: false },
          { name: 'data_vencimento', type: 'timestamp', isNullable: false },

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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
