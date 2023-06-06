import { IsNotEmpty, IsNumber } from 'class-validator';

export class CriarAlunoDto {
  @IsNotEmpty()
  @IsNumber()
  idAluno: number;

  @IsNotEmpty()
  @IsNumber()
  idEmprestimoLivro: number;
}
