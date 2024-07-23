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
        const newMensaje = await this.mensajeService.createMensaje(createMensajeDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Mensaje creado',
            mensaje: newMensaje
        });
    }

    @Get('/:noLeido')
    @UseGuards(AuthGuard)
    async getMensajes(@Res() res, @Param() noLeido){
        this.logger.log('GET - lista de mensajes.');
        console.log(noLeido)
        const mensajes = await this.mensajeService.getMensajes(noLeido);
        return res.status(HttpStatus.OK).json({
            message: 'Lista de mensajes',
            mensajes: mensajes
        });
    }

    @Delete('/:mensajeId')
    @UseGuards(AuthGuard)
    async deleteMensaje(@Res() res, @Param('mensajeId') mensajeId: string){
        this.logger.log('DELETE - mensaje.');
        await this.mensajeService.deleteMensaje(mensajeId);
        return res.status(HttpStatus.OK).json({
            message: 'Mensaje eliminado',
        });
    }

    @Put('/:mensajeId')
    @UseGuards(AuthGuard)
    async updateMensaje(@Res() res, @Param('mensajeId') mensajeId: string, @Body() updateMensajeDTO:CreateMensajeDTO){
        console.log(updateMensajeDTO)
        this.logger.log('UPDATE - mensaje.');
        await this.mensajeService.updateMensaje(mensajeId, updateMensajeDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Mensaje actualizado',
        });
    }

}
