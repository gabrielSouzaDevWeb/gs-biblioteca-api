import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';

describe('Aluno test', () => {
  // let controller: AlunoController;
  let alunoService: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // ALUNO_REPOSITORY,
        {
          provide: 'ALUNO_REPOSITORY',
          useValue: {
            createQueryBuilder: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            findOneBy: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        AlunoService,
      ],
    }).compile();

    // controller = module.get<AlunoController>(AlunoController);
    alunoService = module.get<AlunoService>(AlunoService);
  });

  test('should be defined', () => {
    expect(alunoService).toBeDefined();
  });
});
