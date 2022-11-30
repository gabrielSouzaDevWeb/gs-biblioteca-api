import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuario/usuario.module';

@Module({
  imports: [DatabaseModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
