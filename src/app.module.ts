import { SalaModule } from './sala/sala.module';
import { LivroLocadoModule } from './livro_locado/livro-locado.module';
import { LivroModule } from './livro/livro.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AlunoModule } from './aluno/aluno.module';

() =>{}

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    DashboardModule,
    AlunoModule,
    LivroModule,
    LivroLocadoModule,
    SalaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
