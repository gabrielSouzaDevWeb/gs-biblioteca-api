import { Timestamp } from 'typeorm';
export interface IAluno {
  idPrivado: number;
  idPublico?: string;
  nome: string;
  matricula: number;
  registro?: string;
  sala: number;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
  email: string;
  tel: string;
  telResponsavel: string;
  dtAlteracao?: Timestamp;
  dtCriacao: Timestamp;
  dtDeletado?: Timestamp;
}
