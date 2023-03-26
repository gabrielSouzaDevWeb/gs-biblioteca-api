import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';

@Module({
  providers: [LivroService],
  controllers: [LivroController],
})
export class LivroModule {}
