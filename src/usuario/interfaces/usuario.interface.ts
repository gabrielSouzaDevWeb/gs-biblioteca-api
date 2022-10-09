import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nome: string;
  nivelAcesso: string;
  telefone: Number;
  email: string;
  senha: string;
  dtCriacao: Date;
  dtAlteracao: Date;
}
