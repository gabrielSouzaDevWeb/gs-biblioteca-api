import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AtualizarAlunoDto, CriarAlunoDto } from '../common/dto';
import { Aluno } from '../common/entity';
import { IAluno } from '../common/interfaces/aluno-criar.interface';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';

const alunos: ReadonlyArray<Aluno> = [
  new Aluno({
    idPrivado: 7,
    idPublico: '7',
    dtCriacao: '2023-06-08T20:15:42.075Z',
    dtAlteracao: null,
    dtDeletado: null,
    nome: 'Lucas de Souza',
    matricula: '1s11a21ssss1',
    registro: '11s52ss6ss1',
    rua: 'Rua Paraná',
    numero: 238,
    complemento: 'Próximo a UBS-V',
    bairro: 'centro',
    cidade: 'Juripiranga',
    uf: 'PB',
    cep: '5833000',
    email: 'example@gamil.com',
    tel: '3987132784',
    telResponsavel: '83988304147',
    salas: [],
    emprestimos: [
      {
        idPrivado: 35,
        idPublico: null,
        dtCriacao: '2023-06-08T21:03:54.599Z',
        dtAlteracao: null,
        dtDeletado: null,
        idAluno: 7,
        status: 1,
        qntdLivrosAlugados: null,
        livrosEmprestado: [],
      },
      {
        idPrivado: 36,
        idPublico: null,
        dtCriacao: '2023-06-08T21:04:05.058Z',
        dtAlteracao: null,
        dtDeletado: null,
        idAluno: 7,
        status: 1,
        qntdLivrosAlugados: null,
        livrosEmprestado: [
          {
            idPrivado: 37,
            idPublico: null,
            dtCriacao: '2023-06-08T21:04:05.058Z',
            dtAlteracao: null,
            dtDeletado: null,
            statusLocacao: 4,
            dtRenovacao: null,
            dtVencimento: '2023-06-15T21:04:05.066Z',
            renovacoes: 0,
            idLivroEmprestado: 4,
            idEmprestimo: 36,
            livro: {
              idPrivado: 4,
              idPublico: '4',
              dtCriacao: '2023-06-08T20:14:03.443Z',
              dtAlteracao: '2023-06-08T20:16:48.031Z',
              dtDeletado: null,
              nomLivro: 'Rio de tinta 3',
              nomAutor: 'Coralline Müller',
              genero: 'Romance',
              estante: 'Romance',
              prateleira: '2',
              qntdPaginas: '292',
              unidades: 2,
            },
          },
        ],
      },
    ],
  }),
  new Aluno({
    idPrivado: 7,
    idPublico: '7',
    dtCriacao: '2023-06-08T20:15:42.075Z',
    dtAlteracao: null,
    dtDeletado: null,
    nome: 'Lucas de Souza',
    matricula: '1s11a21ssss1',
    registro: '11s52ss6ss1',
    rua: 'Rua Paraná',
    numero: 238,
    complemento: 'Próximo a UBS-V',
    bairro: 'centro',
    cidade: 'Juripiranga',
    uf: 'PB',
    cep: '5833000',
    email: 'example@gamil.com',
    tel: '3987132784',
    telResponsavel: '83988304147',
    salas: [],
    emprestimos: [
      {
        idPrivado: 35,
        idPublico: null,
        dtCriacao: '2023-06-08T21:03:54.599Z',
        dtAlteracao: null,
        dtDeletado: null,
        idAluno: 7,
        status: 1,
        qntdLivrosAlugados: null,
        livrosEmprestado: [],
      },
      {
        idPrivado: 36,
        idPublico: null,
        dtCriacao: '2023-06-08T21:04:05.058Z',
        dtAlteracao: null,
        dtDeletado: null,
        idAluno: 7,
        status: 1,
        qntdLivrosAlugados: null,
        livrosEmprestado: [
          {
            idPrivado: 37,
            idPublico: null,
            dtCriacao: '2023-06-08T21:04:05.058Z',
            dtAlteracao: null,
            dtDeletado: null,
            statusLocacao: 4,
            dtRenovacao: null,
            dtVencimento: '2023-06-15T21:04:05.066Z',
            renovacoes: 0,
            idLivroEmprestado: 4,
            idEmprestimo: 36,
            livro: {
              idPrivado: 4,
              idPublico: '4',
              dtCriacao: '2023-06-08T20:14:03.443Z',
              dtAlteracao: '2023-06-08T20:16:48.031Z',
              dtDeletado: null,
              nomLivro: 'Rio de tinta 3',
              nomAutor: 'Coralline Müller',
              genero: 'Romance',
              estante: 'Romance',
              prateleira: '2',
              qntdPaginas: '292',
              unidades: 2,
            },
          },
        ],
      },
    ],
  }),
];

class MockCriarAlunoDTO extends CriarAlunoDto {
  constructor(params: {
    nome?: string;
    matricula?: string;
    registro?: string;
    sala?: number;
    rua?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    email?: string;
    tel?: string;
    telResponsavel?: string;
  }) {
    super(params);
  }
}

class MockAtualizarAlunoDTO extends AtualizarAlunoDto {
  constructor(params: {
    idPrivado?: number;
    idPublico?: string | number;
    dtCriacao?: string;
    dtAlteracao?: string;
    dtDeletado?: string;
    nome?: string;
    matricula?: string;
    registro?: string;
    sala?: number;
    rua?: string;
    numero?: number;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    email?: string;
    tel?: string;
    telResponsavel?: string;
  }) {
    super(params);
  }
}

const mockAlunoAtualizarDTO: MockAtualizarAlunoDTO = new MockAtualizarAlunoDTO({
  idPrivado: 6,
  idPublico: '6',
  dtCriacao: '2023-04-02T10:39:02.656Z',
  dtAlteracao: null,
  dtDeletado: null,
  nome: 'Érica',
  matricula: '12345',
  registro: 'valid',
  sala: 1,
  email: 'example@gamil.com',
  tel: '83987132784',
  telResponsavel: '83988304147',
  rua: 'Rua Paraná',
  numero: 230,
  complemento: 'Próximo a UBS-V',
  bairro: 'centro',
  cidade: 'Júripiranga',
  uf: 'PB',
  cep: '5833000',
});
const mockAlunoDTO: MockCriarAlunoDTO = new MockCriarAlunoDTO({
  nome: 'gsls',
  matricula: '1s11a21a1sss1',
  registro: '11s52ssas11',
  sala: 1,
  rua: 'Rua Paraná',
  numero: 238,
  complemento: 'Próximo a UBS-V',
  bairro: 'centro',
  cidade: 'Juripiranga',
  uf: 'PB',
  cep: '5833000',
  email: 'example@gamil.com',
  tel: '3987132784',
  telResponsavel: '83988304147',
});

const mockAlunoCreatedReturn: IAluno = {
  nome: 'gsls',
  matricula: '1s11a21a1sss1',
  registro: '11s52ssas11',
  idSala: 1,
  rua: 'Rua Paraná',
  numero: 238,
  complemento: 'Próximo a UBS-V',
  bairro: 'centro',
  cidade: 'Juripiranga',
  uf: 'PB',
  cep: '5833000',
  email: 'example@gamil.com',
  tel: '3987132784',
  telResponsavel: '83988304147',
  dtDeletado: null,
  idPrivado: 10,
  dtCriacao: '2023-06-09T16:37:50.117Z',
  dtAlteracao: null,
};

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

const err = (msg: string, HttpStatus: HttpStatus) => ({
  message: msg ?? 'err',
  status: HttpStatus,
});

const request = {};

const query: { [key: string]: string | number } = { nome: 'nome_aluno' };

describe('TestController', () => {
  let controller: AlunoController;
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [
        {
          provide: AlunoService,
          useValue: {
            criarAluno: jest.fn().mockResolvedValue(mockAlunoCreatedReturn),
            consultarAluno: jest.fn().mockResolvedValue(alunos),
            atualizarAluno: jest.fn().mockResolvedValue(alunos[0]),
            deletar: jest.fn().mockResolvedValue(alunos[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
    service = module.get<AlunoService>(AlunoService);
  });

  describe('consultarAluno RouterHandle', () => {
    it('should be return statusCode 200 and alunos array', async () => {
      await controller.consultarAluno(response, request, query);

      expect(service.consultarAluno).toBeCalledWith(query);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toBeCalledWith({
        message: 'Consulta realizada com sucesso!!',
        data: alunos,
      });
    });
    it('should be return statusCode 200 and alunos array when havent query', async () => {
      await controller.consultarAluno(response, request);
      expect(service.consultarAluno).toBeCalledWith(undefined);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toBeCalledWith({
        message: 'Consulta realizada com sucesso!!',
        data: alunos,
      });
    });
    it('should be return statusCode 500 and alunos array when consultarAluno throws', async () => {
      jest
        .spyOn(service, 'consultarAluno')
        .mockRejectedValueOnce(new InternalServerErrorException());
      await expect(
        controller.consultarAluno(response, request, query),
      ).rejects.toThrow(new InternalServerErrorException(''));
    });
  });

  describe('criarAluno RouterHandler', () => {
    it('should return 200 ', async () => {
      await controller.criarAluno(mockAlunoDTO, request, response);
      expect(service.criarAluno).toBeCalledWith(mockAlunoDTO);
      expect(response.status).toBeCalledWith(HttpStatus.CREATED);
      expect(response.json).toBeCalledWith({
        message: 'Cadastro criado com sucesso!',
        data: mockAlunoCreatedReturn,
      });
    });

    it('should return 400', async () => {
      jest.spyOn(service, 'criarAluno').mockImplementation(() => {
        return new Promise<any>((resolve, reject) => {
          reject(err('erro', HttpStatus.INTERNAL_SERVER_ERROR));
        });
      });
      await expect(
        controller.criarAluno(mockAlunoDTO, request, query),
      ).rejects.toThrow(
        new InternalServerErrorException(
          err('erro', HttpStatus.INTERNAL_SERVER_ERROR),
        ),
      );
    });
  });

  describe('deletar RouterHandler', () => {
    it('should return a badRequestException when havent aluno id ', async () => {
      const idPrivadoAluno: number = Number('1');
      await controller.deletar(response, request, idPrivadoAluno);
      jest
        .spyOn(service, 'deletar')
        .mockImplementationOnce(async (id): Promise<any> => {
          return new Promise<any>((resolve, reject) => {
            reject(err('erro', HttpStatus.INTERNAL_SERVER_ERROR));
          });
        });
      expect(service.deletar).toBeCalledWith(idPrivadoAluno);
      await expect(
        controller.deletar(response, request, idPrivadoAluno),
      ).rejects.toThrow(
        new InternalServerErrorException(
          err('erro', HttpStatus.INTERNAL_SERVER_ERROR),
        ),
      );
    });
    it('should return aluno deleted', async () => {
      const idPrivadoAluno: number = Number('1');
      await controller.deletar(response, request, idPrivadoAluno);
      expect(service.deletar).toBeCalledWith(idPrivadoAluno);
      expect(response.status).toBeCalledWith(HttpStatus.OK);
      expect(response.json).toBeCalledWith({
        message: 'Aluno deletado com sucesso!!',
        data: alunos[0],
      });
    });
  });

  describe('atualizarAluno RouterHandler', () => {
    it('should return internal server error when atualizarAluno throws', async () => {
      //Arrange
      const idPrivadoAluno: number = Number('1');
      jest
        .spyOn(service, 'atualizarAluno')
        .mockRejectedValueOnce(err('erro', HttpStatus.INTERNAL_SERVER_ERROR));
      //Act
      const attAluno = controller.atualizarAluno(
        response,
        request,
        idPrivadoAluno,
        mockAlunoAtualizarDTO,
      );
      //Assert
      await expect(attAluno).rejects.toThrow(
        new InternalServerErrorException(
          err('erro', HttpStatus.INTERNAL_SERVER_ERROR),
        ),
      );
      expect(service.atualizarAluno).toBeCalledWith(
        idPrivadoAluno,
        mockAlunoAtualizarDTO,
      );
    });
    it('should return aluno edited', async () => {
      const idPrivadoAluno: number = Number('1');
      await controller.atualizarAluno(
        response,
        request,
        idPrivadoAluno,
        mockAlunoAtualizarDTO,
      );

      expect(service.atualizarAluno).toHaveBeenCalledWith(
        idPrivadoAluno,
        mockAlunoAtualizarDTO,
      );
      expect(response.status).toBeCalledWith(HttpStatus.OK);
      expect(response.json).toBeCalledWith({
        message: 'Aluno atualizado com sucesso!!',
        data: alunos[0],
      });
    });
  });
});
