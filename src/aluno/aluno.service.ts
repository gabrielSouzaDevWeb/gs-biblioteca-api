import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { Aluno } from './entity/aluno.entity';

@Injectable()
export class AlunoService {
  constructor(
    @Inject('ALUNO_REPOSITORY')
    private alunoRepository: Repository<Aluno>,
  ) {}
  getAll(): Promise<Array<any>> {
    return;
  }

  async criarAluno(aluno, req): Promise<void> {
    return this.alunoRepository.save(aluno);
  }
}
