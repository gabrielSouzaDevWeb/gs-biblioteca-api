// import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AtualizarDTO } from 'src/common/dto/abstract.dto';

// import { IsNotEmpty } from 'class-validator';

export class AtualizarAlunoDto extends AtualizarDTO {
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
  uf: string;

  @IsNotEmpty()
  // @IsNumber()
  @IsString()
  cep: string;

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
