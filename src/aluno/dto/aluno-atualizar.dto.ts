// import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { IsEmpty, IsOptional } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

// import { IsNotEmpty } from 'class-validator';

export class AtualizarAlunoDto {
  @IsNotEmpty()
  @IsNumber()
  idPrivado: number;

  @IsString()
  idPublico: string;

  @IsNotEmpty()
  dtCriacao: Timestamp;

  @IsOptional()
  dtAlteracao: Timestamp;

  @IsEmpty()
  dtDeletado: Timestamp;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  matricula: number;

  @IsString()
  @IsNotEmpty()
  registro: string;

  @IsNotEmpty()
  @IsNumber()
  sala: number;

  @IsNotEmpty()
  @IsString()
  rua: string;

  @IsNotEmpty()
  @IsNumber()
  numero: number;

  @IsString()
  complemento: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsNumber()
  // @IsString()
  cep: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  // @IsNumber()
  @IsString()
  tel: string;

  @IsNotEmpty()
  // @IsNumber()
  @IsString()
  telResponsavel: string;
}
