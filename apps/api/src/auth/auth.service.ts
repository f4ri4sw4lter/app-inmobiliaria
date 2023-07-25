import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsuarioSchema } from './schemas/usuario.schema';
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
     * @param createUsuarioDTO
     * @returns Usuario
     */
    async createUsuario(createUsuarioDTO: CreateUsuarioDTO): Promise<Usuario>{
        const newUsuario = new this.usuarioModel(createUsuarioDTO);
        return await newUsuario.save();;
    }

    /**
     * Retorna usuario en la bdd.
     * 
     * @param email
     * @returns usuario
     */
    async findUsuario(username: string, password: string): Promise<Usuario>{
        const usuario = await this.usuarioModel.findOne({username});
        /*if(usuario?.password !== password){
            throw new UnauthorizedException();
        }
        const payload = { sub: usuario._id, username: usuario.username };
        return {
            access_token: await this.jwt.signAsync(payload),
        };*/
        return usuario;
    }

    generateJWT(usuario: Usuario){
        const payload: PayloadToken = { role: usuario.role, sub: usuario.id };
        return {
            access_token: this.jwt.sign(payload)
        }
    }
}
