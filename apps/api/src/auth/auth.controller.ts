import { Controller, Get, Post, Put, Patch, Delete, Res, Req, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards, UnauthorizedException } from '@nestjs/common';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { AuthService } from './auth.service';
import { RegisterUsuarioDTO } from './dto/register-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './interfaces/token.interface';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUsuarioDTO } from './dto/update-usuario.dto';
import FileLogger from '../../utils/fileLogger'
import { RequestResetPassDto } from './dto/request-reset-pass.dto';
import { v4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {

    private bcrypt = require('bcrypt');

    private readonly logger = new Logger(AuthController.name);
    private fileLogger = new FileLogger('../client/public/logs/usuarios.log');

    constructor(private authService: AuthService, private jwt: JwtService, private readonly mailService: MailService) { }

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
        if (usuario) {
            const isValidPass = this.bcrypt.compare(LoginUsuarioDTO.password, usuario.password);
            if (isValidPass) {
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

        const already_exist = await this.alreadyExistUsuario({ email, password });

        if (already_exist) {
            this.logger.log('ERROR: Usuario ya existente');
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Usuario ya existente.'
            });
        }

        //Guardamos el nuevo usuario
        else {
            await this.authService.createUsuario(RegisterUsuarioDTO);
            this.fileLogger.log(`Registro nuevo User-${JSON.stringify(RegisterUsuarioDTO)}`);
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado.'
            });
        }
    }

    @Get('/')
    @UseGuards(AuthGuard)
    async getUsuarios(@Res() res){
        this.logger.log('GET - lista de usuarios.');
        const usuarios = await this.authService.getUsuarios();
        return res.status(HttpStatus.OK).json({
            message: 'Lista de usuarios',
            usuarios: usuarios
        });
    }

    @Get('/userById/:usuarioId')
    @UseGuards(AuthGuard)
    async getUsuarioById(@Res() res, @Param('usuarioId') usuarioId: string){
        this.logger.log('GET - usuario por id.');
        const usuario = await this.authService.getUsuarioById(usuarioId);
        return res.status(HttpStatus.OK).json({
            message: 'Usuario',
            user: usuario
        });
    }

    @Post('/login')
    async login(@Req() req, @Res() res, @Body() LoginUsuarioDTO: LoginUsuarioDTO) {
        this.logger.log('GET - Logeando usuario.');

        const user = await this.authService.findUsuario(LoginUsuarioDTO.email);

        if (user) {
            const isValidPass = await this.bcrypt.compare(LoginUsuarioDTO.password, user.password);
            if (isValidPass) {

                const payload: PayloadToken = { email: user.email };

                const token = await this.jwt.signAsync(payload);
                
                this.fileLogger.log(`Login User-${JSON.stringify(user)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'Login exitoso',
                    token: token,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    role: user.role.level
                });
            }
        }

        throw new UnauthorizedException('Credenciales incorrectas');
    }

    @Delete('/delete/:usuarioId')
    @UseGuards(AuthGuard)
    async deleteUser(@Res() res, @Param('usuarioId') usuarioId: string) {
        this.logger.log('DELETE - Borrando user.');
        try {
            const deletedUsuario = await this.authService.deleteUsuario(usuarioId);
            if (deletedUsuario === null) {
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Usuario inexistente'
                });
            } else {
                this.fileLogger.log(`Eliminacion User-${JSON.stringify(deletedUsuario)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'Usuario eliminada correctamente',
                    User: deletedUsuario
                });
            }

        } catch (err) {
            throw err;
        }
    }

    @Put('/update/:userId')
    @UseGuards(AuthGuard)
    async updateUser(@Res() res, @Body() updateUserDTO: UpdateUsuarioDTO, @Param('userId') userId){
        this.logger.log('PUT - Actualizando user.');
        try{
            const updatedUser = await this.authService.updateUsuario(userId, updateUserDTO);
            if(updatedUser === null){
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'user inexistente'
                }); 
            }else{
                this.fileLogger.log(`Actualizacion User-${JSON.stringify(updatedUser)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'user actualizado',
                    user: updatedUser
                }); 
            }
        }catch(err){
            throw err;
        }
    }

    @Patch('/initReset')
    async resetPass(@Res() res, @Body() requestResetPassDto: RequestResetPassDto): Promise<void>{
        
        const { mail } = requestResetPassDto;
        const user = await this.authService.findUsuario(mail);
        
        const resetPassToken = v4();
        user.resetPassToken = resetPassToken;

        user.save()
        if (!user) {
            
            return res.status(HttpStatus.CONFLICT).json({
                message: 'reset pass fail'
            })

        } else {

            await this.mailService.recuperarPassword(user.email, resetPassToken)

            return res.status(HttpStatus.OK).json({
                message: 'reset pass',
            })

        }
    }

    @Patch('/validateReset')
    async validateResetPass(@Res() res, @Body() body){

        const {nuevaPass, validate, codigo, email} = body;

        const nuevaPassEncrypt = await this.encryptPassword(nuevaPass)

        if (nuevaPass === validate) {
            const isReseted = await this.authService.resetPass(nuevaPassEncrypt, codigo, email);

            if(isReseted){
                return res.status(HttpStatus.OK).json({
                    message: 'Contraseña actualizada',
                })
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Error en el codigo',
                    code: 8
                })
            }
        }

        return res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Contraseñas diferentes',
            code: 9
        })

    }
}
