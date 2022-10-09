import { niveisAcesso } from './consts/niveisAcesso.const';
import { UsuarioSchema } from './schemas/usuario.schema';
import { CriarUsuarioDto } from './dtos/usuario.dto';
import { IUsuario } from './interfaces/usuario.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { NivelAcesso } from './enums/niveisAcesso.enum';
import { btoa } from 'buffer';
import { timingSafeEqual } from 'crypto';

export type User = any;

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuarios')
    private readonly UsuarioModel: Model<IUsuario>,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async criarUsuario(req, usuario: CriarUsuarioDto): Promise<IUsuario> {
    usuario = {
      ...usuario,
      nivelAcesso: NivelAcesso[usuario.nivelAcesso],
      email: btoa(usuario.email),
      senha: btoa(usuario.senha),
    };

    const usuarioJaCadastrado = await this.consultarUsuarioPorChaveValor(
      'email',
      usuario.email,
    );

    if (usuarioJaCadastrado) {
      throw new Error('O usuario já está cadastrado');
    }

    return await new this.UsuarioModel(usuario).save();
  }

  async pegarTodosUsuarios(): Promise<Array<IUsuario>> {
    return await this.UsuarioModel.find();
  }

  public async consultarUsuarioPorChaveValor(
    chave: string,
    valor: any,
  ): Promise<IUsuario> {
    valor = chave === 'email' || 'senha' ? btoa(valor) : valor;
    return await this.UsuarioModel.findOne({ [chave]: valor });
  }

  async pegarUsuarioPorEmail(req, usuario) {
    return await this.consultarUsuarioPorChaveValor(
      'email',
      btoa(usuario.email),
    );
  }

  async verificarEmailSenha(req): Promise<IUsuario> {
    const { email, senha } = req.query;
    const usuario = { email, senha };

    let usuarioExistente: any = await this.consultarUsuarioPorChaveValor(
      'email',
      btoa(usuario.email),
    );

    if (usuarioExistente && usuarioExistente.senha === btoa(usuario.senha)) {
      usuarioExistente = {
        ...usuarioExistente,
        nivelAcesso: NivelAcesso[usuarioExistente.nivelAcesso],
      };
      return usuarioExistente._doc;
    }
    throw 'email ou senha incorreto';
  }
}
