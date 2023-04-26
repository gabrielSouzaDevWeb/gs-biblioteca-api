import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
          { name: 'dt_locacao', type: 'varchar(255)', isNullable: false },
          { name: 'dt_renovacao', type: 'varchar(255)', isNullable: false },
          { name: 'renovacoes', type: 'int', isNullable: false }, //quantas vezes a locação foi renovada
          { name: 'dt_vencimento', type: 'varchar(255)', isNullable: false },

          {
            name: 'dt_criacao',
            type: 'varchar(255)',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'dt_alteracao',
            type: 'varchar(255)',
            onUpdate: 'now()',
            isNullable: true,
          },
          {
            name: 'dt_deletado',
            type: 'varchar(255)',
            isNullable: true,
          },
          { name: 'municipio', type: 'int', isNullable: false },
          { name: 'biblioteca', type: 'int', isNullable: false },
          { name: 'estado', type: 'int', isNullable: false },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'livro_locado',
      new TableForeignKey({
        columnNames: ['aluno_locador'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'aluno',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'livro_locado',
      new TableForeignKey({
        columnNames: ['livro_locado'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'livro',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
