import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  Body,
  Query,
  Req,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { AtualizarAlunoDto, CriarAlunoDto } from '../common/dto/';
import { IAluno } from '../common/interfaces/aluno-criar.interface';
import { AlunoService } from './aluno.service';

const entity = 'aluno';

@Controller('aluno')
export class AlunoController {
  constructor(private service: AlunoService) {}

  @Post()
  async criarAluno(
    @Body() aluno: CriarAlunoDto,
    @Req() req,
    @Res() res,
  ): Promise<any> {
    await this.service
      .criarAluno(aluno)
      .then((result: IAluno) => {
        res
          .status(HttpStatus.CREATED)
          .json({ message: 'Cadastro criado com sucesso!', data: result });
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  @Get()
  async consultarAluno(
    @Res() res,
    @Req() req,
    @Query() query?: { [key: string]: string | number },
  ) {
    await this.service
      .consultarAluno(query)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  @Put('atualizar/:idPrivado')
  async atualizarAluno(
    @Res() res,
    @Req() re,
    @Param('idPrivado') id: number,
    @Body() aluno: AtualizarAlunoDto,
  ) {
    await this.service
      .atualizarAluno(id, aluno)
      .then((result: IAluno) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Aluno atualizado com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Delete('deletar/:idPrivado')
  async deletar(@Res() res, @Req() req, @Param('idPrivado') id: number) {
    return await this.service
      .deletar(id)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Aluno deletado com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
