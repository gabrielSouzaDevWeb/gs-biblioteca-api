import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { EnderecoDTO } from 'src/endereco/dto/endereco.dto';
import { ContatoDTO } from './../../contato/dto/contato.dto';

// import { IsNotEmpty } from 'class-validator';

export class AlunoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  matricula: string;

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
