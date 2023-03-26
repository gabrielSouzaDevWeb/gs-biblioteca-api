import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';
export class ContatoDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(11, {
    message:
      'O número do telefone contém mais caracteres que o esperado. Por favor, digitar o número respeitando o seguinte exemplo (xx) x xxxx-xxxx',
  })
  tel: number;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(11, {
    message:
      'O número do telefone contém mais caracteres que o esperado. Por favor, digitar o número respeitando o seguinte exemplo (xx) x xxxx-xxxx',
  })
  telResponsavel: number;
}
