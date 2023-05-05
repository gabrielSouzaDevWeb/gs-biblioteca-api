import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createFksLivroLocado1683287065630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('livro_locado', [
      new TableForeignKey({
        columnNames: ['livro_locado'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'livro',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['aluno_locador'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'aluno',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
