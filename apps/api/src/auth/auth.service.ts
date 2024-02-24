import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { RegisterUsuarioDTO } from './dto/register-usuario.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './interfaces/token.interface';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectModel('Usuario') private usuarioModel: Model<Usuario>,
        private jwt: JwtService
    ){}

    /**
     * Crea el usuario en la bdd.
     * 
     * @param LoginUsuarioDTO
     * @returns Usuario
     */
    async createUsuario(RegisterUsuarioDTO: RegisterUsuarioDTO): Promise<Usuario>{
        const newUsuario = new this.usuarioModel(RegisterUsuarioDTO);
        return await newUsuario.save(); 
    }

    /**
     * Retorna usuario en la bdd.
     * 
     * @param email
     * @param password
     * 
     * @returns usuario
     */
    async findUsuario(email: string): Promise<Usuario>{
        return await this.usuarioModel.findOne({email});
    }

    generateJWT(usuario: Usuario){
        const payload: PayloadToken = { email: usuario.email };

        const token = this.jwt.signAsync(payload)

        return {
            token,
        }
    }
}
