import { Timestamp } from 'typeorm';

export interface IAbstractColumns {
  idPrivado: number;
  idPublico: string;
  dtCriacao: Timestamp;
  dtAlteracao: Timestamp;
  dtDeletado: Timestamp;
}
