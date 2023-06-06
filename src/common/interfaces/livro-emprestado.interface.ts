import { IAluno } from 'src/common/interfaces/aluno-criar.interface';
import { ILivro } from 'src/common/interfaces/livro.interface';
import { Timestamp } from 'typeorm';

export interface ILivroEmprestado {
  statusLocacao: number;
  dtLocacao: Timestamp | Date;
  dtRenovacao?: Timestamp | Date;
  dtVencimento: Timestamp | Date;
  renovacao: number;
  idAluno: number;
  aluno?: IAluno;
  livro?: ILivro;
  livroEmprestado?: number;
  alunoEmprestado?: number;
  dtAlteracao?: Timestamp | Date;
  dtCriacao?: Timestamp | Date;
  dtDeletado?: Timestamp | Date;
  nomLivros?: string;
  categoria?: string;
  nomAutor?: string;
  idPrivadoLivro?: number;
}
