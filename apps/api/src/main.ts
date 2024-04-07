import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix('/api');
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
