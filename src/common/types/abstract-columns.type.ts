import { Timestamp } from 'typeorm';

export interface IAbstractColumns {
  idPrivado: number;
  idPublico: string;
  dtCriacao: string | Timestamp | Date;
  dtAlteracao: string | Timestamp | Date;
  dtDeletado: string | Timestamp | Date;
}
