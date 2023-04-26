import { Module } from '@nestjs/common';
import { Aluno } from 'src/aluno/entity/aluno.entity';
import { Livro } from 'src/livro/entity/livro.entity';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './../database/database.module';
import { LivroLocado } from './entity/livro-locado.entity';
import { LivroLocadoController } from './livro-locado.controller';
import { LivroLocadoService } from './livro-locado.service';

const LIVRO_LOCADO_REPOSITORY = {
  provide: 'LIVRO_LOCADO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(LivroLocado),
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
  controllers: [LivroLocadoController],
  imports: [DatabaseModule],
  exports: [LIVRO_LOCADO_REPOSITORY, LivroLocadoService],
  providers: [
    LIVRO_LOCADO_REPOSITORY,
    LIVRO_REPOSITORY,
    ALUNO_REPOSITORY,
    LivroLocadoService,
  ],
})
export class LivroLocadoModule {}
