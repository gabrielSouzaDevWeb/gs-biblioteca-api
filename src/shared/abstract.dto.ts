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

  @IsNotEmpty()
  idPublico: string | number;

  @IsNotEmpty()
  dtCriacao: string;

  @IsOptional()
  dtAlteracao: string;

  @IsEmpty()
  dtDeletado: string;
}
