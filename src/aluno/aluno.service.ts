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
  }): Promise<Array<IAluno>> {
    const camposConsultadosComILike: string[] = [
      'nome',
      'email',
      'cidade',
      'complemento',
      'estado',
      'registro',
    ];
    const alunos = await this.alunoRepository.createQueryBuilder('aluno');
    alunos.where(`aluno.dt_deletado is null`);
    for (const key in query) {
      if (camposConsultadosComILike.includes(key)) {
        alunos.andWhere(`aluno.${key} ilike '%${query[key]}%'`);
        continue;
      }
      alunos.andWhere(`aluno.${key} = ${query[key]}`);
    }
    return alunos.getMany();
  }

  async criarAluno(aluno: CriarAlunoDto | any, req): Promise<IAluno> {
    const alunoExiste: boolean = await this.verificarAlunoCriarExiste(aluno);
    if (alunoExiste) {
      throw new BadRequestException(
        'Já existe aluno cadastrado com essa matricula ou com esse registro',
      );
    }
    const alunoCriado: IAluno = await this.alunoRepository.save(aluno);
    this.adicionarIdPublico(alunoCriado);
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
    return !!registroAlunoEncontrado && !!matriculaAlunoEncontrado;
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
