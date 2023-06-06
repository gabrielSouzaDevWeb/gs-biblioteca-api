import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LivroEmprestadoModule } from 'src/livro-emprestado/livro-emprestado.module';
import { DataSource } from 'typeorm';
import { Emprestimo } from './../common/entity/emprestimo.entity';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';

export const EMPRESTIMO_REPOSITORY = {
  provide: 'EMPRESTIMO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Emprestimo),
  inject: ['DATA_SOURCE'],
};
@Module({
  controllers: [EmprestimoController],
  imports: [DatabaseModule, LivroEmprestadoModule],
  providers: [EMPRESTIMO_REPOSITORY, EmprestimoService],
  exports: [EmprestimoService],
})
export class EmprestimoModule {}
