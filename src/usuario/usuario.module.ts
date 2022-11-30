import { DatabaseModule } from '../database/database.module';
import { usuarioProviders } from './provider/usuario';
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuario.controller';
import { UsuariosService } from './usuario.service';

@Module({
  controllers: [UsuariosController],
  imports: [DatabaseModule],
  providers: [...usuarioProviders, UsuariosService],
  exports: [...usuarioProviders],
})
export class UsuariosModule {}
