import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { Aluno } from '../common/entity/aluno.entity';
import { LivroEmprestadoModule } from './../livro-emprestado/livro-emprestado.module';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

const ALUNO_REPOSITORY = {
  provide: 'ALUNO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Aluno),
  inject: ['DATA_SOURCE'],
};

@Module({
  controllers: [AlunoController],
  imports: [DatabaseModule, LivroEmprestadoModule],
  providers: [ALUNO_REPOSITORY, AlunoService],
})
export class AlunoModule {}
