import { IsNumber, IsNotEmpty } from '@nestjs/class-validator';

// import { IsNotEmpty } from 'class-validator';

export class AlunoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  matricula: string;

  @IsNotEmpty()
  @IsNumber()
  sala: string;

  @IsNotEmpty()
  endereco: any; //enderecoDTO

  @IsNotEmpty()
  contato: any; //ContatoDTO

  @IsNotEmpty()
  registro: string;
}
