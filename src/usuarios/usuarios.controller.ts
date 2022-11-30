import { IUsuario } from './interface/usuario.interface';
import { CriarUsuarioDto } from './dto/usuario.dto';
import { UsuariosService } from './usuarios.service';
import {
  Controller,
  Get,
  Res,
  Req,
  HttpStatus,
  Post,
  BadRequestException,
  Body,
} from '@nestjs/common';

@Controller('usuario')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

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
    @Body() criarUsuarioDto: CriarUsuarioDto,
  ): Promise<any> {
    return this.usuariosService
      .criarUsuario(req, criarUsuarioDto)
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
