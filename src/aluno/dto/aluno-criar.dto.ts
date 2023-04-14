// import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// import { IsNotEmpty } from 'class-validator';

export class CriarAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsString()
  matricula: string;

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
  uf: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

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
