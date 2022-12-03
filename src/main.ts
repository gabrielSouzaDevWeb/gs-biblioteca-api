import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const whitelist = ['http://localhost:5500'];
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  //https://stackoverflow.com/questions/50949231/nestjs-enable-cors-in-production

  /*{
    origin: function (origin, callback) {
      console.log(origin);

      if (whitelist.indexOf(origin) !== -1) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  }*/

  // app.enableCors();
  // const corsOptions = {
  //   origin: 'http://localhost:5500',
  //   optionsSuccessStatus: 200,
  //   AccessControlAllowOrigin: '*',
  // };
  // app.use(cors(corsOptions));

  await app.listen(3000);
}
bootstrap();
