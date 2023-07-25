import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { Usuario } from "../interfaces/usuario.interface";
import bcrypt from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){

    private readonly logger = new Logger(LocalStrategy.name);

    async comparePassword (password: string, receivedPassword: string) {
        const bcrypt = require('bcrypt');
        return await bcrypt.compare(password, receivedPassword);
    }

    constructor( private authService: AuthService){
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string){
        this.logger.log('validate - Logeando usuario.');
        const user: Usuario = await this.authService.findUsuario(username, password);
        if(!user){
            throw new UnauthorizedException('No Autorizado');
        }
        if(!this.comparePassword(user.password, password)){
            throw new UnauthorizedException('No Autorizado');
        }
        return user;
    }
}