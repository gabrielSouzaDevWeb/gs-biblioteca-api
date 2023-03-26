// import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnderecoDTO } from 'src/endereco/dto/endereco.dto';
import { ContatoDTO } from './../../contato/dto/contato.dto';

// import { IsNotEmpty } from 'class-validator';

export class AlunoDto {
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
  endereco: EnderecoDTO; //enderecoDTO

  @IsNotEmpty()
  contato: ContatoDTO; //ContatoDTO
}
