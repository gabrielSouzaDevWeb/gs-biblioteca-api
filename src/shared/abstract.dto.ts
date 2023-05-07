import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from '@nestjs/class-validator';

export class AtualizarDTO {
  @IsNotEmpty()
  @IsNumber()
  idPrivado: number;

  @IsOptional()
  idPublico: string | number;

  @IsOptional()
  dtCriacao: string;

  @IsOptional()
  dtAlteracao: string;

  @IsEmpty()
  dtDeletado: string;
}
