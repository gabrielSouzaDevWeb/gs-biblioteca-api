import { UsuarioSchema } from './schemas/usuario.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuarios', schema: UsuarioSchema }]),
  ],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
