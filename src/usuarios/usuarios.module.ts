import { DatabaseModule } from './../database/database.module';
import { usuarioProviders } from './provides/usuario';
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],
  imports: [DatabaseModule],
  providers: [...usuarioProviders, UsuariosService],
  exports: [...usuarioProviders],
})
export class UsuariosModule {}
