import { Module } from '@nestjs/common';
import { EmprestimoController } from './emprestimo.controller';
import { EmprestimoService } from './emprestimo.service';

@Module({
  controllers: [EmprestimoController],
  providers: [EmprestimoService]
})
export class EmprestimoModule {}
