import { Req } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  constructor() {}
  @Get('/')
  HandlerHello(@Res() res, @Req() req) {
    return res.status(HttpStatus.OK).json({ message: 'Hello World!' });
  }
}
