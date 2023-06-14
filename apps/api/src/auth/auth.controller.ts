import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { AuthService } from './auth.service';
import { UsuarioSchema } from './schemas/usuario.schema';
import { create } from 'domain';
import bcrypt from 'bcryptjs'

@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) { }

    /**
     * Retorna la contraseña cifrada
     * 
     * @param password
     * 
     * @returns String
     */
    async encryptPassword (password) {
        //Aplicamos un algoritmo recursivo.
        const salt = await bcrypt.genSalt(10);
        //Retornamos la contraseña hasheada.
        return await bcrypt.hash(password, salt);
    }

    /**
     * 
     * @param password 
     * @param receivedPassword 
     */
    async comparePassword (password, receivedPassword) {
        return await bcrypt.compare(password, receivedPassword);
    }

    @Post('/signup')
    async signUp(@Res() res, @Body() createUsuarioDTO: CreateUsuarioDTO) {
        this.logger.log('POST - Creando usuario.');

        const newUsuario = await this.authService.signUp(createUsuarioDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Usuario creado.',
            usuario: newUsuario
        });
    }


    @Post('/signin')
    async signIn(@Res() res, @Body() createUsuarioDTO: CreateUsuarioDTO) {
        this.logger.log('GET - Logeando usuario.');

        createUsuarioDTO.password = await this.encryptPassword(createUsuarioDTO.password);
        this.logger.log('HOLAA');
        this.logger.log(createUsuarioDTO);
        const newUsuario = await this.authService.signUp(createUsuarioDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Usuario creado.',
            usuario: newUsuario
        });
    }




}
