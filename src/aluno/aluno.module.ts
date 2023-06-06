import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmprestimoModule } from 'src/emprestimo/emprestimo.module';
import { DataSource } from 'typeorm';
import { Aluno } from '../common/entity/aluno.entity';
import { LivroEmprestadoModule } from './../livro-emprestado/livro-emprestado.module';
import { LivroModule } from './../livro/livro.module';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

const ALUNO_REPOSITORY = {
  provide: 'ALUNO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Aluno),
  inject: ['DATA_SOURCE'],
};

@Module({
  controllers: [AlunoController],
  imports: [
    DatabaseModule,
    LivroEmprestadoModule,
    EmprestimoModule,
    LivroModule,
  ],
  providers: [ALUNO_REPOSITORY, AlunoService],
})
export class AlunoModule {}
