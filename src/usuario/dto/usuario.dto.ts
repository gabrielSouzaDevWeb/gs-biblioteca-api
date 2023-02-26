import { IsNumber, IsNotEmpty, IsEmail } from '@nestjs/class-validator';

// import { IsNotEmpty } from 'class-validator';

export class CriarUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  nivelAcesso: string;

  @IsNotEmpty()
  biblioteca: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  uf: string;

  @IsNotEmpty()
  municipio: string;

  @IsNotEmpty()
  @IsNumber()
  telefone: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  cargo: string;
}
