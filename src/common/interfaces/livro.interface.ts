import { Timestamp } from 'typeorm';

export interface ILivro {
  idPrivado?: number;
  idPublico?: string;
  nomLivro: string;
  nomAutor: string;
  genero: string;
  estante?: string;
  prateleira?: string;
  qntdPaginas: string;
  unidades: number;
  dtAlteracao?: Timestamp;
  dtCriacao?: Timestamp;
  dtDeletado?: Timestamp;
}
