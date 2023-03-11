import { AlunoService } from './aluno.service';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  Req,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator';
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
}
