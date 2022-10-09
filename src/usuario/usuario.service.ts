import { UsuarioSchema } from './schemas/usuario.schema';
import { CriarUsuarioDto } from './dtos/usuario.dto';
import { IUsuario } from './interfaces/usuario.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { NivelAcesso } from './enums/niveisAcesso.enum';
import { btoa } from 'buffer';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuarios')
    private readonly UsuarioModel: Model<IUsuario>,
  ) {}
  async criarUsuario(req, usuario: CriarUsuarioDto): Promise<IUsuario> {
    // console.log({
    //   ...usuario,
    //   email: atob(usuario.email),
    //   senha: atob(usuario.senha),
    // });

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

  private async consultarUsuarioPorChaveValor(
    chave: string,
    valor: string | number,
  ): Promise<IUsuario> {
    return await this.UsuarioModel.findOne({ [chave]: valor });
  }

  async pegarUsuarioPorEmail(req, usuario) {
    return await this.consultarUsuarioPorChaveValor(
      'email',
      btoa(usuario.email),
    );
  }

  async verificarEmailSenha(req): Promise<IUsuario> {
    const { email, senha } = req.params;
    const usuario = { email, senha };
    const usuarioExistente = await this.consultarUsuarioPorChaveValor(
      'email',
      btoa(usuario.email),
    );
    if (usuarioExistente.senha === btoa(usuario.senha)) {
      console.log('Esse usuario Existe!');
      return usuarioExistente;
    }
  }
}
