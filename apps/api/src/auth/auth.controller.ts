import { Controller, Get, Post, Put, Delete, Res, Req, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { LoginUsuarioDTO } from './dto/usuario.dto';
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
    async alreadyExistUsuario(LoginUsuarioDTO: LoginUsuarioDTO): Promise<boolean>{
        const { email, password } = LoginUsuarioDTO;
        const usuario = await this.authService.findUsuario(email, password);
        if(usuario == null){
            return false;
        }else{
            return true;
        }
    }

    /*ENDPOINTS*/
    @Post('/signup')
    async signUp(@Res() res, @Body() LoginUsuarioDTO: LoginUsuarioDTO) {
        this.logger.log('POST - Creando usuario.');

        //Compruebo si el usuario ya existe.
        const already_exist = await this.alreadyExistUsuario(LoginUsuarioDTO);
        if(already_exist){
            this.logger.log('ERR: Usuario ya existente');
            return res.status(HttpStatus.CONFLICT).json({
                message: 'Usuario ya existente.'
            });
        }

        else{
            //Reemplazamos la password por la encriptacion.
            //LoginUsuarioDTO.password = await this.encryptPassword(LoginUsuarioDTO.password);
            //Guardamos el nuevo usuario
            //Generamos token para el nuevo usuario.
            //const jwt = require('jsonwebtoken');
            //const token = jwt.sign({id: newUsuario._id}, process.env.SECRET, {
            //    expiresIn: 86400 //24hs
            //})
            const newUsuario = await this.authService.createUsuario(LoginUsuarioDTO);
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado.'
            });
        }
    }

    @Get('/signin')
    async ignIn(@Req() req, @Res() res, @Body() LoginUsuarioDTO: LoginUsuarioDTO) {
    //signIn(@Req() req){
        this.logger.log('GET - Logeando usuario.');
        //const user = req.email as Usuario;
        //return this.authService.generateJWT(user);
        //LoginUsuarioDTO.password = await this.encryptPassword(LoginUsuarioDTO.password);
        //const newUsuario = await this.authService.signUp(LoginUsuarioDTO);
        const newUsuario = await this.authService.findUsuario(LoginUsuarioDTO.email, LoginUsuarioDTO.password);
        return res.status(HttpStatus.OK).json({
            newUsuario
        });
    }




}
