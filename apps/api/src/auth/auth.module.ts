import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants/jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        /*JwtModule.registerAsync({
            useFactory: () => {
                return{
                    secret: 'THE123!@#',
                    signOptions: {
                        expiresIn: '10d',
                    }
                }
            }
        }),*/
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1d'}
        }),
        PassportModule,
        MongooseModule.forFeature([
            {name: 'Usuario', schema: UsuarioSchema}
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [PassportModule, AuthService],
})
export class AuthModule {}
