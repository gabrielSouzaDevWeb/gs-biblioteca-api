import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LivroLocadoModule } from 'src/livro_locado/livro-locado.module';
import { DataSource } from 'typeorm';
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
  imports: [DatabaseModule, LivroLocadoModule],
  providers: [ALUNO_REPOSITORY, AlunoService],
})
export class AlunoModule {}
