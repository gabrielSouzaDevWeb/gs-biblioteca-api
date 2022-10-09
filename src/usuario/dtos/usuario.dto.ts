import { IsNumber, IsNotEmpty, IsEmail } from '@nestjs/class-validator';
// import { IsNotEmpty } from 'class-validator';

export class CriarUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  nivelAcesso: string;

  @IsNotEmpty()
  @IsNumber()
  telefone: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;
}
