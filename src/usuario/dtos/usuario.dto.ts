import { IsNotEmpty } from 'class-validator';

export class CriarUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  nivelAcesso: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;
}
