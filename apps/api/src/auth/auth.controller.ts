import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { AuthService } from './auth.service';
import { create } from 'domain';

@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService){}

    @Post('/signup')
    async signUp(@Res() res, @Body() createUsuarioDTO:CreateUsuarioDTO){
        this.logger.log('POST - Creando usuario.');
        const newUsuario = await this.authService.signUp(createUsuarioDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Usuario creado.',
            usuario: newUsuario
        });
    }
    

    //@Post('/signin')

}
