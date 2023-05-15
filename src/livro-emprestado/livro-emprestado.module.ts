import { Module } from '@nestjs/common';
import { Aluno } from 'src/common/entity/aluno.entity';
import { Livro } from 'src/common/entity/livro.entity';
import { DataSource } from 'typeorm';
import { EmprestimoLivros } from '../common/entity/livro-emprestado.entity';
import { DatabaseModule } from '../database/database.module';
import { LivroEmprestadoController } from './livro-emprestado.controller';
import { LivroEmprestadoService } from './livro-emprestado.service';

const LIVRO_EMPRESTADO_REPOSITORY = {
  provide: 'LIVRO_EMPRESTADO_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(EmprestimoLivros),
  inject: ['DATA_SOURCE'],
};
const LIVRO_REPOSITORY = {
  provide: 'LIVRO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Livro),
  inject: ['DATA_SOURCE'],
};
const ALUNO_REPOSITORY = {
  provide: 'ALUNO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Aluno),
  inject: ['DATA_SOURCE'],
};

@Module({
  controllers: [LivroEmprestadoController],
  imports: [DatabaseModule],
  exports: [LIVRO_EMPRESTADO_REPOSITORY, LivroEmprestadoService],
  providers: [
    LIVRO_EMPRESTADO_REPOSITORY,
    LIVRO_REPOSITORY,
    ALUNO_REPOSITORY,
    LivroEmprestadoService,
  ],
})
export class LivroEmprestadoModule {}
