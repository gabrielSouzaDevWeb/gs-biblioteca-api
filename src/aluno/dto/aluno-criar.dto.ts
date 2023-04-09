// import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// import { IsNotEmpty } from 'class-validator';

export class CriarAlunoDto {
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
  cidade: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  @IsNumber()
  cep: number;

  @IsNotEmpty()
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
