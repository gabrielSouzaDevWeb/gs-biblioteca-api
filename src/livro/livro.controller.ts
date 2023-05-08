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
import { AtualizarLivroDto } from './dto/livro-atualizar.dto';
import { CriarLivroDto } from './dto/livro-criar.dto';
import { ILivro } from './interface/livro.interface';
import { LivroService } from './livro.service';
// import { Query } from 'typeorm/driver/Query';
const entity = 'livro';

@Controller('livro')
export class LivroController {
  constructor(private service: LivroService) {}
  @Post()
  async criarLivro(@Body() livro: CriarLivroDto, @Req() req, @Res() res) {
    await this.service
      .cadastrar<ILivro>(livro, req)
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
  async consultarLivro(
    @Res() res,
    @Req() req,
    @Query() query: { [key: string]: string | number },
  ) {
    await this.service
      .consultarLivro(query)
      .then((result) => {
        console.log(result);
        res
          .status(HttpStatus.OK)
          .json({ message: 'Consulta realizada com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }

  @Put('atualizar/:idPrivado')
  async atualizarAluno(
    @Res() res,
    @Req() req,
    @Param('idPrivado') id: number,
    @Body() aluno: AtualizarLivroDto,
  ) {
    await this.service
      .atualizarLivro(id, aluno)
      .then((result) => {
        res
          .status(HttpStatus.OK)
          .json({ message: 'Livro atualizado com sucesso!!', data: result });
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
          .json({ message: 'livro deletado com sucesso!!', data: result });
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
