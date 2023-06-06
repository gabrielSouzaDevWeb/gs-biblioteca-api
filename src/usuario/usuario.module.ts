import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsuariosController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

import { Usuarios } from 'src/common/entity/usuarios.entity';
import { DataSource } from 'typeorm';
const usuarioProviders = [
  {
    provide: 'USUARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuarios),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  controllers: [UsuariosController],
  imports: [DatabaseModule],
  providers: [...usuarioProviders, UsuarioService],
  exports: [...usuarioProviders, UsuarioService],
})
export class UsuarioModule {}
