import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(@InjectModel('Usuario') private usuarioModel: Model<Usuario>){}

    async signUp(createUsuarioDTO: CreateUsuarioDTO): Promise<Usuario>{
        const newUsuario = new this.usuarioModel(createUsuarioDTO);


        await newUsuario.save();
        return newUsuario;
    }
}
