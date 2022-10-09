import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema(
  {
    nome: { type: String },
    cargo: String,
    nivelAcesso: { type: Intl },
    email: String,
    telefone: { type: Intl },
    senha: String,
    dtCriacao: Date,
    dtAlteracao: Date,
  },
  { timestamps: true, collection: 'Usuarios' },
);
