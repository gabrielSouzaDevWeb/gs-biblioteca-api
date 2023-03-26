import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { Module } from '@nestjs/common';

@Module({ controllers: [EnderecoController], providers: [EnderecoService] })
export class EnderecoModule {}
