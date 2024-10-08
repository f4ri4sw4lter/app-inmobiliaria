import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { CreateMensajeDTO } from './dto/mensaje.dto';
import { MensajeService } from './mensaje.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import FileLogger from '../../utils/fileLogger'
import { ConfigService } from '../config/config.service';
@Controller('mensaje')
export class MensajeController {

    private readonly logger = new Logger(MensajeController.name);
    private fileLogger = new FileLogger('../client/public/logs/mensajes.log');
    
    constructor(private mensajeService: MensajeService){}

    @Post('/')
    async createMensaje(@Res() res, @Body() createMensajeDTO:CreateMensajeDTO){
        this.logger.log('POST - Creando mensaje.');
        const newMensaje = await this.mensajeService.createMensaje(createMensajeDTO);
        this.fileLogger.log(`POST- ${JSON.stringify(newMensaje)}`);

        return res.status(HttpStatus.OK).json({
            message: 'Mensaje creado',
            mensaje: newMensaje
        });
    }

    @Get('/:noLeido')
    @UseGuards(AuthGuard)
    async getMensajes(@Res() res, @Param() noLeido){
        this.logger.log('GET - lista de mensajes.');
        const mensajes = await this.mensajeService.getMensajes(noLeido);
        this.fileLogger.log(`GET- ${JSON.stringify(mensajes)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Lista de mensajes',
            mensajes: mensajes
        });
    }

    @Delete('/:mensajeId')
    @UseGuards(AuthGuard)
    async deleteMensaje(@Res() res, @Param('mensajeId') mensajeId: string){
        this.logger.log('DELETE - mensaje.');
        const mensaje = await this.mensajeService.deleteMensaje(mensajeId);
        this.fileLogger.log(`DELETE- ${JSON.stringify(mensaje)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Mensaje eliminado',
        });
    }

    @Put('/:mensajeId')
    @UseGuards(AuthGuard)
    async updateMensaje(@Res() res, @Param('mensajeId') mensajeId: string, @Body() updateMensajeDTO:CreateMensajeDTO){
        this.logger.log('UPDATE - mensaje.');
        const mensaje = await this.mensajeService.updateMensaje(mensajeId, updateMensajeDTO);
        this.fileLogger.log(`PUT- ${JSON.stringify(mensaje)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Mensaje actualizado',
        });
    }

}
