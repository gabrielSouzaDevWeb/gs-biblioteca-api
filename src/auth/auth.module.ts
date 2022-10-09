import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { UsuarioModule } from './../usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    JwtStrategy,
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
