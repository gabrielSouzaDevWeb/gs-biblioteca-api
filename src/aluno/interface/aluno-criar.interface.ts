import { Timestamp } from 'typeorm';
export interface IAluno {
  idPrivado: number;
  idPublico?: string;
  nome: string;
  matricula: string;
  registro?: string;
  sala: number;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  email: string;
  tel: string;
  telResponsavel: string;
  dtAlteracao?: Timestamp;
  dtCriacao: Timestamp;
  dtDeletado?: Timestamp;
}
