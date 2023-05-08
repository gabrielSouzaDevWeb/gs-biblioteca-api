import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createFkAlunoSalas1683565845087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('aluno_salas', [
      new TableForeignKey({
        columnNames: ['id_aluno'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'aluno',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['id_sala'],
        referencedColumnNames: ['id_privado'],
        referencedTableName: 'sala',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
