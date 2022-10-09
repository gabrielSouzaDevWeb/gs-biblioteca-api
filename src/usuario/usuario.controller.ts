import { CriarUsuarioDto } from './dtos/usuario.dto';
import { UsuarioService } from './usuario.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Post('')
  async criarUsuario(
    @Res() res: any,
    @Req() req: any,
    @Body() usuario: CriarUsuarioDto,
  ) {
    return this.service
      .criarUsuario(req, usuario)
      .then((data) => {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Usuario criado com sucesso!', data });
      })
      .catch((err) => {
        throw new BadRequestException({
          message: 'Erro ao cadastrar usuario',
          error: err,
        });
      });
  }

  // @get('')
  @Get('login')
  async login(@Res() res: any, @Req() req: any) {
    return this.service
      .verificarEmailSenha(req)
      .then((data) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Login efetuado com sucesso', data });
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
