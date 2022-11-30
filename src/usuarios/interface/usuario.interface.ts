import { Timestamp } from 'typeorm';
export interface IUsuario {
  nome: string;
  nivelAcesso: string | number;
  telefone: Number;
  email: string;
  senha: string;
  dtCriacao: Date | Timestamp;
  dtAlteracao: Date | Timestamp;
}
