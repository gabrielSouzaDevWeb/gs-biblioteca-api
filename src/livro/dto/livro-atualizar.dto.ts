import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AtualizarDTO } from 'src/shared/abstract.dto';

export class AtualizarLivroDto extends AtualizarDTO {
  @IsString()
  @IsNotEmpty()
  nomLivro: string;

  @IsNotEmpty()
  @IsString()
  nomAutor: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsOptional()
  @IsString()
  estante: string;

  @IsOptional()
  @IsString()
  prateleira: string;

  @IsNotEmpty()
  @IsString()
  qntdPaginas: number;

  @IsNotEmpty()
  @IsNumber()
  unidades: number;
}
