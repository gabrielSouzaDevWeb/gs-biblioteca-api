import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import {
  Body,
  Req,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { AlunoService } from './aluno.service';
import { AlunoDto } from './dto/aluno.dto';
const entity = 'aluno';

@Controller('aluno')
export class AlunoController {
  constructor(private service: AlunoService) {}

  @Get('get-all')
  getAllRegistros(@Res() res, @Req() req) {
    this.service
      .getAll()
      .then((data) =>
        res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada!', data }),
      )
      .catch((err) => {
        throw new Error(err);
      });
  }

  @Post()
  async PostAluno(@Body() aluno: AlunoDto, @Req() req, @Res() res) {
    await this.service.postAluno(aluno, req);
  }
}
