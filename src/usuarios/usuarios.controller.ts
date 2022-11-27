import { UsuariosService } from './usuarios.service';
import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  async pegarTodosOsRegistros(@Req() req, @Res() res) {
    return res
      .status(HttpStatus.OK)
      .json({ message: 'cosulta realizada com sucesso!' });
  }
}
