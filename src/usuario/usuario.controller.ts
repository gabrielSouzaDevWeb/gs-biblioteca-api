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
import { CriarUsuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuariosController {
  constructor(private usuariosService: UsuarioService) {}

  @Get()
  async pegarTodosOsRegistros(@Req() req, @Res() res) {
    return this.usuariosService
      .findAll()
      .then((data) => {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'cosulta realizada com sucesso!', data });
      })
      .catch((err) => {
        throw new BadRequestException({
          message: 'Erro ao cadastrar usuario',
          error: err,
        });
      });
  }

  @Post()
  async criarUsuario(
    @Req() req,
    @Res() res: any,
    @Body() body: CriarUsuarioDto,
  ): Promise<any> {
    console.log(body);
    return this.usuariosService
      .criarUsuario(req, body)
      .then((data) => {
        return res
          .status(HttpStatus.CREATED)
          .json({ message: 'registro criado com sucesso!', data });
      })
      .catch((err) => {
        throw new BadRequestException({
          message: 'Erro ao cadastrar usuario',
          error: err,
        });
      });
  }
}
