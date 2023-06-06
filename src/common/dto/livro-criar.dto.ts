import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarLivroDto {
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
  @IsString()
  unidades: string;
}
