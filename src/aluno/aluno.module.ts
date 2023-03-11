import { AlunoController } from './aluno.controller';
import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { DataSource } from 'typeorm';
import { Aluno } from './entity/aluno.entity';

@Module({
  controllers: [AlunoController],
  providers: [
    {
      provide: 'ALUNO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Aluno),
      inject: ['DATA_SOURCE'],
    },
    ,
    AlunoService,
  ],
})
export class AlunosModule {}
