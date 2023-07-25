import { Controller, Get, Post, Put, Delete, Res, Req, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { AuthService } from './auth.service';
import { UsuarioSchema } from './schemas/usuario.schema';
import { create } from 'domain';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from './interfaces/usuario.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    /**
     * Retorna la contraseña cifrada
     * 
     * @param password
     * @returns String
     */
    async encryptPassword (password: string) {
        const bcrypt = require('bcrypt');
        //Aplicamos un algoritmo recursivo.
        const salt = await bcrypt.genSalt(10);
        //Retornamos la contraseña hasheada.
        return await bcrypt.hash(password, salt);
    }

    /**
     * Compara la constraseña
     * 
     * @param password 
     * @param receivedPassword 
     */
    async comparePassword (password: string, receivedPassword: string) {
        const bcrypt = require('bcrypt');
        return await bcrypt.compare(password, receivedPassword);
    }

    /**
     * Retorna un indicador si el usuario ya existe en la bdd.
     * @param password 
     * @param receivedPassword 
     */
    async alreadyExistUsuario(createUsuarioDTO: CreateUsuarioDTO): Promise<boolean>{
        const { email, password } = createUsuarioDTO;
        const usuario = await this.authService.findUsuario(email, password);
        if(usuario == null){
            return false;
        }else{
            return true;
        }
    }

    /*ENDPOINTS*/
    @UseGuards(AuthGuard('local'))
    @Post('/signup')
    async signUp(@Res() res, @Body() createUsuarioDTO: CreateUsuarioDTO) {
        this.logger.log('POST - Creando usuario.');

        //Compruebo si el usuario ya existe.
        const already_exist = await this.alreadyExistUsuario(createUsuarioDTO);
        if(already_exist){
            this.logger.log('ERR: Usuario ya existente');
            return res.status(HttpStatus.CONFLICT).json({
                message: 'Usuario ya existente.'
            });
        }

        else{
            //Reemplazamos la password por la encriptacion.
            createUsuarioDTO.password = await this.encryptPassword(createUsuarioDTO.password);

            //Guardamos el nuevo usuario
            const newUsuario = await this.authService.createUsuario(createUsuarioDTO);

            //Generamos token para el nuevo usuario.
            const jwt = require('jsonwebtoken');
            
            const token = jwt.sign({id: newUsuario._id}, process.env.SECRET, {
                expiresIn: 86400 //24hs
            })

            return res.status(HttpStatus.OK).json({token});
        }
    }

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    //signIn(@Req() req, @Res() res, @Body() createUsuarioDTO: CreateUsuarioDTO) {
    signIn(@Req() req){
        this.logger.log('GET - Logeando usuario.');
        const user = req.user as Usuario;

        return this.authService.generateJWT(user);

        //createUsuarioDTO.password = await this.encryptPassword(createUsuarioDTO.password);

        //const newUsuario = await this.authService.signUp(createUsuarioDTO);
    }




}
