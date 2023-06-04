import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { EmprestimoService } from 'src/emprestimo/emprestimo.service';
// import { AtualizarEmprestimoDto } from 'src/emprestimo/dto/emprestimo-atualizar.dto';
// import { CriarEmprestimoDto } from 'src/emprestimo/dto/emprestimo-criar.dto';

@Controller('emprestimo')
export class EmprestimoController {
  constructor(private service: EmprestimoService) {}

  // @Get('get-all')
  // getAllRegistros(@Res() res, @Req() req) {
  //   this.service
  //     .getAll()
  //     .then((data) =>
  //       res
  //         .status(HttpStatus.OK)
  //         .json({ message: 'Consulta realizada!', data }),
  //     )
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // }

  @Post()
  async criarEmprestimo(@Body() emprestimo: any, @Req() req, @Res() res) {
    // return res.status(200).json(emprestimo);
    console.log('touch');
    await this.service
      .criarEmprestimo(emprestimo, req)
      .then((result) =>
        res
          .status(HttpStatus.CREATED)
          .json({ message: 'Cadastro criado com sucesso!', data: result }),
      )
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Get()
  async consultarEmprestimo(
    @Res() res,
    @Req() req,
    @Query() query: { [key: string]: string | number },
  ) {
    console.log('touch');
    await this.service
      .consultarEmprestimo(query)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Get('by-idAluno')
  async consultarEmprestimoPorIdAluno(
    @Res() res,
    @Req() req,
    @Query() query: { [key: string]: string | number },
  ) {
    const { idAluno } = query;

    await this.service
      .consultarEmprestimoIdAluno(idAluno)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Put('atualizar/:idPrivado')
  async atualizarEmprestimo(
    @Res() res,
    @Req() re,
    @Param('idPrivado') id: number,
    @Body() emprestimo: any,
  ) {
    await this.service
      .atualizarEmprestimo(id, emprestimo)
      .then((result) => {
        res.status(HttpStatus.OK).json({
          message: 'Emprestimo atualizado com sucesso!!',
          data: result,
        });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Delete('deletar/:idPrivado')
  async deletar(@Res() res, @Req() req, @Param('idPrivado') id: number) {
    await this.service
      .deletar(id)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Emprestimo deletado com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
