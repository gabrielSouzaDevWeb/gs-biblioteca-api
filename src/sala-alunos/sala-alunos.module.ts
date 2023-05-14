import { Module } from '@nestjs/common';
import { SalaAlunosController } from './sala-alunos.controller';
import { SalaAlunosService } from './sala-alunos.service';

@Module({
  controllers: [SalaAlunosController],
  providers: [SalaAlunosService]
})
export class SalaAlunosModule {}
