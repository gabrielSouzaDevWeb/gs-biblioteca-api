import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { CriarAlunoDto } from 'src/common/dto/aluno-criar.dto';
import { AtualizarAlunoDto } from '../common/dto/aluno-atualizar.dto';
import { AlunoService } from './aluno.service';

const entity = 'aluno';

@Controller('aluno')
export class AlunoController {
  constructor(private service: AlunoService) {}

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
  async criarAluno(@Body() aluno: CriarAlunoDto, @Req() req, @Res() res) {
    // return res.status(200).json(aluno);
    console.log('touch');
    await this.service
      .criarAluno(aluno, req)
      .then((result) =>
        res
          .status(HttpStatus.CREATED)
          .json({ message: 'Cadastro criado com sucesso!', data: result }),
      )
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Post('aluno-alugar/:idPrivadoAluno/livro/:idPrivadoLivro')
  async alunoAlugarlivro(
    @Res() res,
    @Req() req,
    @Param('idPrivadoAluno') idPrivadoAluno: number,
    @Param('idPrivadoLivro') idPrivadoLivro: number,
  ) {
    await this.service
      .alunoAlugarlivro(idPrivadoAluno, idPrivadoLivro)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Aluguel registrado com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Get()
  async consultarAluno(
    @Res() res,
    @Req() req,
    @Query() query: { [key: string]: string | number },
  ) {
    console.log('touch');
    await this.service
      .consultarAluno(query)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  // @Get('detalhe')
  // async pegarDetalhe(@Res() res, @Req() req, @Query() query) {
  //   this.service
  //     .livrosAlugados(req, query)
  //     .then((result) => {
  //       res
  //         .status(HttpStatus.OK)
  //         .json({ message: 'Consulta realizada com sucesso!!', data: result });
  //     })
  //     .catch((err) => {
  //       throw new BadRequestException(err);
  //     });
  //   // setTimeout(() => {
  //   //   return res.status(HttpStatus.OK).json({
  //   //     message: 'Consulta realizada com sucesso!',
  //   //     data: {
  //   //       idPrivado: 1,
  //   //       idPublico: '1',
  //   //       nomLivro: '12 Regras para a vida',
  //   //       nomAutor: 'Jordan B. Peterson',
  //   //       categoria: 'Auto ajuda',
  //   //       estante: 'suspense',
  //   //       prateleira: '3',
  //   //       paginas: 7,
  //   //       unidades: 1,
  //   //     },
  //   //   });
  //   // }, 1000);
  // }

  @Put('atualizar/:idPrivado')
  async atualizarAluno(
    @Res() res,
    @Req() re,
    @Param('idPrivado') id: number,
    @Body() aluno: AtualizarAlunoDto,
  ) {
    await this.service
      .atualizarAluno(id, aluno)
      .then((result) => {
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
    await this.service
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
