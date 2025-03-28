import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PropiedadModule } from './propiedad/propiedad.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CORRELATION_ID_HEADER, CorrelationIdMiddleware } from './correlation-id/correlation-id.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { ImagesModule } from './images/images.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { DocumentoModule } from './documento/documento.module';
import { ContratoModule } from './contrato/contrato.module';
import { ConfModule } from './config/config.module';
import { MailModule } from './mail/mail.module';
import { MetricsModule } from './metrics/metrics.module';
import config from './config';


@Module({
  imports: [
    //Modulos propios.
    PropiedadModule,
    ClienteModule,
    AuthModule,
    ImagesModule,
    MensajeModule,
    DocumentoModule,
    ImagesModule,
    MensajeModule,
    DocumentoModule,
    ContratoModule,
    ConfModule,
    MailModule,
    MetricsModule,

    //Modulo de configuracion del proyecto.
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      //Validacion de los tipos de datos del .env
      validationSchema: Joi.object({
        NODE_ENV: Joi.string(),
        DB_URI: Joi.string(),
        SECRET: Joi.string(),
        IS_PUBLIC_KEY: Joi.bool(),
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
