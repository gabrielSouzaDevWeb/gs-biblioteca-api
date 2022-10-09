import { IUsuario } from './../usuario/interfaces/usuario.interface';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@nestjs/common';
import { btoa } from 'buffer';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const email = username;
    const usuario: IUsuario =
      await this.usuarioService.consultarUsuarioPorChaveValor('email', email);
    if (usuario && usuario.senha === btoa(password)) {
      const { senha, ...result } = usuario;
      return usuario;
    }
    return 0;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
