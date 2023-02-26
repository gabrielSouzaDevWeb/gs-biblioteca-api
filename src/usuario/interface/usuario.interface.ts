import { Timestamp } from 'typeorm';
export interface IUsuario {
  nome: string;
  nivelAcesso: string | number;
  telefone: Number;
  municipio: string;
  biblioteca: string;
  estado: string;
  email: string;
  senha: string;
  logado: boolean;
  dtCriacao: Date | Timestamp;
  dtAlteracao: Date | Timestamp;
}
