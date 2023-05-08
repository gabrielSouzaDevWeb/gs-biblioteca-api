import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createFks1683557039270 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'emprestimo',
      new TableForeignKey({
        columnNames: ['id_aluno'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'aluno',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKeys('emprestimo_livros', [
      new TableForeignKey({
        columnNames: ['id_livro_emprestado'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'livro',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['id_emprestimo'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'emprestimo',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
