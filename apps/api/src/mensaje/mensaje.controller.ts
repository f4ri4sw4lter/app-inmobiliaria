import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { CreateMensajeDTO } from './dto/mensaje.dto';
import { MensajeService } from './mensaje.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@Controller('mensaje')
export class MensajeController {

    private readonly logger = new Logger(MensajeController.name);
    
    constructor(private mensajeService: MensajeService){}

    @Post('/')
    async createMensaje(@Res() res, @Body() createMensajeDTO:CreateMensajeDTO){
        this.logger.log('POST - Creando mensaje.');
        console.log(createMensajeDTO);
        const newMensaje = await this.mensajeService.createMensaje(createMensajeDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Mensaje creado',
            mensaje: newMensaje
        });
    }

    @Get('/')
    @UseGuards(AuthGuard)
    async getMensajes(@Res() res){
        this.logger.log('GET - lista de mensajes.');
        const mensajes = await this.mensajeService.getMensajes();
        return res.status(HttpStatus.OK).json({
            message: 'Lista de mensajes',
            mensajes: mensajes
        });
    }

}
