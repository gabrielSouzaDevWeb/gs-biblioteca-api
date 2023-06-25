// import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AtualizarDTO } from '.';

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

  // @IsNotEmpty()
  // @IsNumber()
  // sala: number;

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

  constructor(params: {
    idPrivado?: number;
    idPublico?: string | number;
    dtCriacao?: string;
    dtAlteracao?: string;
    dtDeletado?: string;
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
    super();
    this.idPrivado = params?.idPrivado;
    this.idPublico = params?.idPublico;
    this.dtCriacao = params?.dtCriacao;
    this.dtAlteracao = params?.dtAlteracao;
    this.dtDeletado = params?.dtDeletado;
    this.nome = params?.nome;
    this.matricula = params?.matricula;
    this.registro = params?.registro;
    // this.sala = params?.sala;
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
