import { BadRequestException, Injectable } from '@nestjs/common';

import { Inject } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { AtualizarAlunoDto } from './dto/aluno-atualizar.dto';
import { CriarAlunoDto } from './dto/aluno-criar.dto';
import { Aluno } from './entity/aluno.entity';
import { IAluno } from './interface/aluno-criar.interface';

@Injectable()
export class AlunoService {
  constructor(
    @Inject('ALUNO_REPOSITORY')
    private alunoRepository: Repository<Aluno>,
  ) {}
  async consultarAluno(query: {
    [key: string]: string | number;
  }): Promise<{ result: Array<IAluno>; count: number }> {
    try {
      const camposConsultadosComILike: string[] = [
        'nome',
        'email',
        'cidade',
        'complemento',
        'estado',
        'registro',
        'idPublico',
      ];
      const paginacao = ['page', 'all', 'take'];
      const alunos = await this.alunoRepository.createQueryBuilder('aluno');

      for (const key in query) {
        if (camposConsultadosComILike.includes(key)) {
          alunos.andWhere(`aluno.${key} ilike '%${query[key]}%'`);
          continue;
        }
        if (paginacao.includes(key)) {
          const paginationOptions = {
            //TODO implementar regra do all ou remover
            [`page`]: alunos.skip(
              Number(
                ((Number(query['page']) as number) - 1) *
                  Number(query['take'] as number),
              ) as number,
            ),
            [`take`]: alunos.take(Number(query['take'])),
          };
          paginationOptions[key];
          continue;
        }
        alunos.andWhere(`aluno.${key} = ${query[key]}`);
      }
      const result = await alunos.getMany();
      const count = await alunos.getCount();
      return { result, count };
    } catch (error) {
      throw new Error(error);
    }
  }

  async criarAluno(aluno: CriarAlunoDto | any, req): Promise<IAluno> {
    const alunoExiste: boolean = await this.verificarAlunoCriarExiste(aluno);
    if (alunoExiste) {
      throw new BadRequestException(
        'Já existe aluno cadastrado com essa matricula ou com esse registro',
      );
    }
    let alunoCriado: IAluno;
    await this.alunoRepository
      .save(aluno)
      .then((aluno) => {
        alunoCriado = aluno;
        this.adicionarIdPublico(aluno);
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return alunoCriado;
  }

  async adicionarIdPublico(aluno: IAluno): Promise<void> {
    if (aluno.idPrivado) {
      const idPublico: string = String(aluno.idPrivado);
      await this.alunoRepository.update(aluno.idPrivado, {
        idPublico,
        dtAlteracao: null,
      });
      return;
    }
    //TODO:estratégia para adicionar idpublico antes de criar o registro no banco
  }

  async atualizarAluno(id: number, aluno: AtualizarAlunoDto) {
    const { idPrivado, idPublico, ...alunoAtualizar } = aluno;
    try {
      return await this.alunoRepository.update(id, alunoAtualizar);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verificarAlunoCriarExiste(aluno: IAluno): Promise<boolean> {
    const registroAlunoEncontrado: IAluno =
      await this.consultarAlunoPorChaveValor('matricula', aluno.matricula);

    const matriculaAlunoEncontrado: IAluno =
      await this.consultarAlunoPorChaveValor('registro', aluno.registro);
    return !!registroAlunoEncontrado || !!matriculaAlunoEncontrado;
  }

  public async consultarAlunoPorChaveValor(
    chave: string,
    valor: any,
  ): Promise<IAluno> {
    return (await this.alunoRepository.findOneBy({
      [chave]: valor,
    })) as unknown as IAluno;
  }

  async deletar(idPrivado: number): Promise<void> {
    await this.alunoRepository.softDelete(idPrivado);
  }
}
