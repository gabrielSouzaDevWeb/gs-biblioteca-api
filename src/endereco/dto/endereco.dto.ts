import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';
export class EnderecoDTO {
  @IsNotEmpty()
  rua: string;

  @IsNotEmpty()
  @IsNumber()
  numero: string;

  @IsString()
  complemento: string;

  @IsNotEmpty()
  @IsNumber()
  bairro: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  uf: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(7)
  cep: number;
}
