import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Response,
  HttpStatus,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    return this.authService
      .login(req.user)
      .then((data) => {
        //to-do: implement cookie
        res.status(HttpStatus.OK).json({
          message: 'O usuário está autorizado a acessar o sistema',
          data,
        });


      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST);
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
