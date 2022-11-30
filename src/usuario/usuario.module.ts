import { DatabaseModule } from '../database/database.module';
import { usuarioProviders } from './provider/usuario';
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuariosController],
  imports: [DatabaseModule],
  providers: [...usuarioProviders, UsuarioService],
  exports: [...usuarioProviders, UsuarioService],
})
export class UsuarioModule {}
