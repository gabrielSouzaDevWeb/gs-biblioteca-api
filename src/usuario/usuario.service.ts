import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuarios } from '../common/entity/usuarios.entity';
import { NivelAcesso } from '../common/enum/niveisAcesso.enum';
import { IUsuario } from '../common/interfaces/usuario.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuarios>,
  ) {}

  async findAll(): Promise<Array<IUsuario>> {
    return this.usuarioRepository.find();
  }

  async criarUsuario(req, usuario): Promise<IUsuario> {
    const usuarioJaCadastrado = await this.consultarUsuarioPorChaveValor(
      'email',
      usuario.email,
    );

    if (usuarioJaCadastrado) {
      throw new BadRequestException('Já existe um usuário com esse email');
    }
    usuario = {
      ...usuario,
      nivelAcesso: NivelAcesso[usuario.nivelAcesso],
      email: btoa(usuario.email),
      senha: btoa(usuario.senha),
    };

    return this.usuarioRepository.save(usuario);
  }

  public async consultarUsuarioPorChaveValor(
    chave: string,
    valor: any,
  ): Promise<IUsuario> {
    //to-do: alterar a criptografia
    valor = chave === 'email' || 'senha' ? btoa(valor) : valor;
    return this.usuarioRepository.findOneBy({ [chave]: valor });
  }
}
