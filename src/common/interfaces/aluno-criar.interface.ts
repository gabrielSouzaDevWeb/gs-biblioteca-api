import { Timestamp } from 'typeorm';
export interface IAluno {
  idPrivado?: number;
  idPublico?: string;
  nome: string;
  matricula?: string;
  registro?: string;
  idSala?: number;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  email: string;
  tel: string;
  salas?: Array<any>;
  telResponsavel: string;
  dtAlteracao?: string | Timestamp | Date;
  dtCriacao?: string | Timestamp | Date;
  dtDeletado?: string | Timestamp | Date;
}
