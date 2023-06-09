/**
 * Importaciones externas
 */
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
/**
 * Importaciones internas
 */
import { PropiedadModule } from './propiedad/propiedad.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import config from './config';


console.log('URI MONGO:' + process.env.DB_URI);
@Module({
  imports: [
    //Modulos propios.
    PropiedadModule,
    AuthModule,
    //Modulo de configuracion del proyecto.
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      //Validacion de los tipos de datos del .env
      validationSchema: Joi.object({
        NODE_ENV: Joi.string(),
        DB_URI: Joi.string(),
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist'),
    }),
    //Conexion a MongoDB.
    MongooseModule.forRoot(process.env.DB_URI),
    //personalizacion de los logs
    LoggerModule.forRoot({
      pinoHttp:{
        transport: process.env.NODE_ENV == 'development' 
          ?{
            target: 'pino-pretty',
            options:{
              messageKey: 'message',
            },
          }
          : undefined,
        messageKey: 'message',
        customProps: (req: Request) => {
          return {
            correlation: req[CORRELATION_ID_HEADER],
          };
        },
        autoLogging: false,
        serializers:{
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
