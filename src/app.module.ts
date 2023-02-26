import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [DatabaseModule, UsuarioModule, AuthModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
