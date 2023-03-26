import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './../database/database.module';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { Aluno } from './entity/aluno.entity';

const ALUNO_REPOSITORY = {
  provide: 'ALUNO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Aluno),
  inject: ['DATA_SOURCE'],
};

@Module({
  controllers: [AlunoController],
  imports: [DatabaseModule],
  exports: [ALUNO_REPOSITORY, AlunoService],
  providers: [ALUNO_REPOSITORY, AlunoService],
})
export class AlunoModule {}
