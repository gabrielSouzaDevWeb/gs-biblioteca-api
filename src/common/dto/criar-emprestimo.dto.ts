import { IsNotEmpty, IsNumber } from 'class-validator';

export class EmprestimoCriarDto {
  @IsNotEmpty()
  @IsNumber()
  idAluno: number;

  @IsNotEmpty()
  @IsNumber()
  idEmprestimoLivro: number;
}
