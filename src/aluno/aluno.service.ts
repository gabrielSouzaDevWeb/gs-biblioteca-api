import { Injectable } from '@nestjs/common';

@Injectable()
export class AlunoService {
  getAll(): Promise<Array<any>> {
    return;
  }

  postAluno(aluno, req): void {
    console.log(aluno);
  }
}
