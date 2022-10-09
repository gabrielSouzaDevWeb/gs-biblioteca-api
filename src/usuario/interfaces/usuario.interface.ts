import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nome: string;
  nivelAcesso: string;
  email: string;
  senha: string;
  dtCriacao: Date;
  dtAlteracao: Date;
}
