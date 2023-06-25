import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AtualizarDTO } from '.';

export class AtualizarLivroDto extends AtualizarDTO {
  @IsString()
  @IsNotEmpty()
  nomLivro: string;

  @IsNotEmpty()
  @IsString()
  nomAutor: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsOptional()
  @IsString()
  estante: string;

  @IsOptional()
  @IsString()
  prateleira: string;

  @IsNotEmpty()
  @IsString()
  qntdPaginas: string;

  @IsNotEmpty()
  @IsNumber()
  unidades: number;
}
