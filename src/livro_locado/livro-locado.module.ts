import { Module } from '@nestjs/common';
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

@Module({
  controllers: [LivroLocadoController],
  imports: [DatabaseModule],
  exports: [LIVRO_LOCADO_REPOSITORY],
  providers: [LIVRO_LOCADO_REPOSITORY, LivroLocadoService],
})
export class LivroLocadoModule {}
