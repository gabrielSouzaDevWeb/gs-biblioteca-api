import { IAluno } from 'src/aluno/interface/aluno-criar.interface';
import { ILivro } from 'src/livro/interface/livro.interface';
import { Timestamp } from 'typeorm';

export interface ILivroLocado {
  statusLocacao: number;
  dtLocacao: Timestamp | Date;
  dtRenovacao?: Timestamp | Date;
  dtVencimento: Timestamp | Date;
  renovacao: number;
  aluno: IAluno;
  livro: ILivro;
  livroLocado: number;
  alunoLocador: number;
  dtAlteracao?: Timestamp | Date;
  dtCriacao?: Timestamp | Date;
  dtDeletado?: Timestamp | Date;
}
