import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ContatoController } from './contato.controller';
import { ContatoService } from './contato.service';
import { Contato } from './entity/contato.entity';

@Module({
  controllers: [ContatoController],
  providers: [
    ContatoService,
    {
      provide: 'ALUNO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Contato),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class ContatoModule {}
