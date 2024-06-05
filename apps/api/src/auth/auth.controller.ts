import { Controller, Get, Post, Put, Delete, Res, Req, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards, UnauthorizedException } from '@nestjs/common';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { AuthService } from './auth.service';
import { RegisterUsuarioDTO } from './dto/register-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './interfaces/token.interface';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    private bcrypt = require('bcrypt');

    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService, private jwt: JwtService) { }

    /**
     * Retorna la contraseña cifrada
     * 
     * @param password
     * @returns String
     */
    async encryptPassword(password: string) {
        //Retornamos la contraseña hasheada.
        return await this.bcrypt.hash(password, 10);
    }

    /**
     * Retorna un indicador si el usuario ya existe en la bdd.
     * @param password 
     * @param receivedPassword 
     */
    async alreadyExistUsuario(LoginUsuarioDTO: LoginUsuarioDTO): Promise<boolean> {
        const usuario = await this.authService.findUsuario(LoginUsuarioDTO.email);
        if(usuario){
            const isValidPass = this.bcrypt.compare(LoginUsuarioDTO.password, usuario.password);
            if(isValidPass){
                return true;
            }
        }
        return false;
    }

    /*ENDPOINTS*/
    @Post('/register')
    async register(@Res() res, @Body() RegisterUsuarioDTO: RegisterUsuarioDTO) {
        this.logger.log('POST - Creando usuario.');

        const { email, password } = RegisterUsuarioDTO

        RegisterUsuarioDTO.password = await this.encryptPassword(RegisterUsuarioDTO.password);

        const already_exist = await this.alreadyExistUsuario({email, password});

        if (already_exist) {
            this.logger.log('ERROR: Usuario ya existente');
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Usuario ya existente.'
            });
        }
        
        //Guardamos el nuevo usuario
        else {
            await this.authService.createUsuario(RegisterUsuarioDTO);
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado.'
            });
        }
    }

    @Post('/login')
    async login(@Req() req, @Res() res, @Body() LoginUsuarioDTO: LoginUsuarioDTO) {
        this.logger.log('GET - Logeando usuario.');

        const user = await this.authService.findUsuario(LoginUsuarioDTO.email);

        if(user){
            const isValidPass = await this.bcrypt.compare(LoginUsuarioDTO.password, user.password);
            if(isValidPass){

                const payload: PayloadToken = { email: user.email };

                const token = await this.jwt.signAsync(payload)

                return res.status(HttpStatus.OK).json({
                    message: 'Login exitoso',
                    token: token,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname
                });
            }
        }

        throw new UnauthorizedException('Credenciales incorrectas');    
    }


}
