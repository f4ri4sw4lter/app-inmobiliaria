import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Usuario', schema: UsuarioSchema}
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
