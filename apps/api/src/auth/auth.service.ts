import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { RegisterUsuarioDTO } from './dto/register-usuario.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './interfaces/token.interface';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';

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
        const user = await this.usuarioModel.findOne({email})
        return user;
    }

    generateJWT(usuario: Usuario){
        const payload: PayloadToken = { email: usuario.email };

        const token = this.jwt.signAsync(payload)

        return {
            token,
        }
    }

    async deleteUsuario(usuarioId: string): Promise<Usuario>{
        const deletedUsuario = await this.usuarioModel.findByIdAndDelete(usuarioId);
        return deletedUsuario;
    }

    async getUsuarios(): Promise<Usuario[]>{
        const usuarios = await this.usuarioModel.find();
        return usuarios;
    }

    async getUsuarioById(usuarioId: string): Promise<Usuario>{
        const usuario = await this.usuarioModel.findById(usuarioId);
        return usuario;
    }

    async updateUsuario(usuarioId: string, updateUsuarioDTO: UpdateUsuarioDTO): Promise<Usuario>{
        const updatedUsuario = await this.usuarioModel.findByIdAndUpdate(
            usuarioId, 
            updateUsuarioDTO,
            { new: false });
        return updatedUsuario;
    }
}
