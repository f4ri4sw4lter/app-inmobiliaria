import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { CreateClienteDTO } from './dto/cliente.dto';
import { ClienteService } from './cliente.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('cliente')
export class ClienteController {

    private readonly logger = new Logger(ClienteController.name);
    
    constructor(private clienteService: ClienteService){}

    //Agregar try
    @Post('/create')
    @UseGuards(AuthGuard)
    async createCliente(@Res() res, @Body() createClienteDTO:CreateClienteDTO){
        this.logger.log('POST - Creando cliente.');
        const newCliente = await this.clienteService.createCliente(createClienteDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Cliente creado',
            cliente: newCliente
        });
    }

    //Agregar try
    @Get('/')
    @UseGuards(AuthGuard)
    async getClientes(@Res() res){
        this.logger.log('GET - lista de clientes.');
        const clientes = await this.clienteService.getClientes();
        return res.status(HttpStatus.OK).json({
            message: 'Lista de clientes',
            clientes: clientes
        });
    }

    @Get('/:clienteId')
    @UseGuards(AuthGuard)
    async getCliente(@Res() res, @Param('clienteId') clienteId){
        this.logger.log('GET - cliente.');
        try{
            const cliente = await this.clienteService.getCliente(clienteId);
            return res.status(HttpStatus.OK).json({
                message: 'Cliente',
                cliente: cliente
            });
        }catch(err){
            throw new NotFoundException('Cliente no existente');
        }
        
    }

    @Delete('/delete/:clienteId')
    @UseGuards(AuthGuard)
    async deleteCliente(@Res() res, @Param('clienteId') clienteId){
        this.logger.log('DELETE - Borrando cliente.');
        try{
            const deletedCliente = await this.clienteService.deleteCliente(clienteId);
            if(deletedCliente === null){
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Cliente inexistente'
                }); 
            }else{
                return res.status(HttpStatus.OK).json({
                    message: 'Cliente eliminada correctamente',
                    cliente: deletedCliente
                }); 
            }
            
        }catch(err){
            throw err;
        }
    }

    @Put('/update/:clienteId')
    @UseGuards(AuthGuard)
    async updateCliente(@Res() res, @Body() createClienteDTO, @Param('clienteId') clienteId){
        this.logger.log('PUT - Actualizando cliente.');
        try{
            const updatedCliente = await this.clienteService.updateCliente(clienteId, createClienteDTO);
            if(updatedCliente === null){
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Cliente inexistente'
                }); 
            }else{
                return res.status(HttpStatus.OK).json({
                    message: 'Cliente actualizado',
                    cliente: updatedCliente
                }); 
            }
        }catch(err){
            throw err;
        }
    }
}
