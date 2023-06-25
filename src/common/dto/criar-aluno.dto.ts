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

  constructor(params: {
    nome?: string;
    matricula?: string;
    registro?: string;
    sala?: number;
    rua?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    email?: string;
    tel?: string;
    telResponsavel?: string;
  }) {
    this.nome = params?.nome;
    this.matricula = params?.matricula;
    this.registro = params?.registro;
    this.sala = params?.sala;
    this.rua = params?.rua;
    this.numero = params?.numero;
    this.complemento = params?.complemento;
    this.bairro = params?.bairro;
    this.cidade = params?.cidade;
    this.uf = params?.uf;
    this.cep = params?.cep;
    this.email = params?.email;
    this.tel = params?.tel;
    this.telResponsavel = params?.telResponsavel;
  }
}
