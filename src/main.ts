import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const whitelist = ['http://localhost:5500', 'http://localhost:5502'];
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: whitelist,
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
