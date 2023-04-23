import { Timestamp } from 'typeorm';

export interface ILivro {
  idPrivado?: number;
  idPublico?: string;
  nomLivro: string;
  nomAutor: string;
  categoria: string;
  estante?: string;
  prateleira?: string;
  qntdPaginas: number;
  unidades: number;
  dtAlteracao?: Timestamp;
  dtCriacao?: Timestamp;
  dtDeletado?: Timestamp;
}
