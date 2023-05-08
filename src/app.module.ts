import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { LivroEmprestadoModule } from './livro-emprestado/livro-emprestado.module';
import { LivroModule } from './livro/livro.module';
import { SalaAlunosModule } from './sala-alunos/sala-alunos.module';
import { SalaModule } from './sala/sala.module';
import { UsuarioModule } from './usuario/usuario.module';

() => {};

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    DashboardModule,
    AlunoModule,
    LivroModule,
    LivroEmprestadoModule,
    SalaModule,
    SalaAlunosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
