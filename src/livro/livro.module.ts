import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { Livro } from '../common/entity/livro.entity';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
const LIVRO_REPOSITORY = {
  provide: 'LIVRO_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Livro),
  inject: ['DATA_SOURCE'],
};

@Module({
  controllers: [LivroController],
  imports: [DatabaseModule],
  exports: [LIVRO_REPOSITORY],
  providers: [LIVRO_REPOSITORY, LivroService],
})
export class LivroModule {}
