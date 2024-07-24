import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { CreateClienteDTO } from './dto/cliente.dto';
import { ClienteService } from './cliente.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import FileLogger from '../../utils/fileLogger'
//@UseGuards(JwtAuthGuard)
@Controller('cliente')
export class ClienteController {

    private readonly logger = new Logger(ClienteController.name);
    private fileLogger = new FileLogger('../client/public/logs/clientes.log');

    constructor(private clienteService: ClienteService){}

    //Agregar try
    @Post('/create')
    @UseGuards(AuthGuard)
    async createCliente(@Res() res, @Body() createClienteDTO:CreateClienteDTO){
        this.logger.log('POST - Creando cliente.');
        const newCliente = await this.clienteService.createCliente(createClienteDTO);
        this.fileLogger.log(`POST-${JSON.stringify(newCliente)}`);

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
        this.fileLogger.log(`GET-${JSON.stringify(clientes)}`);
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
            this.fileLogger.log(`GET-${JSON.stringify(cliente)}`);
            return res.status(HttpStatus.OK).json({
                message: 'Cliente',
                cliente: cliente
            });
        }catch(err){
            throw new NotFoundException('Cliente no existente');
            this.fileLogger.log(`GET-error`);
        }
        
    }

    @Delete('/delete/:clienteId')
    @UseGuards(AuthGuard)
    async deleteCliente(@Res() res, @Param('clienteId') clienteId){
        this.logger.log('DELETE - Borrando cliente.');
        try{
            const deletedCliente = await this.clienteService.deleteCliente(clienteId);
            if(deletedCliente === null){
                this.fileLogger.log(`DELETE-Error`);
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Cliente inexistente'
                }); 
            }else{
                this.fileLogger.log(`DELETE-${JSON.stringify(deletedCliente)}`);
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
                this.fileLogger.log(`PUT-Error`);
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Cliente inexistente'
                }); 
            }else{
                this.fileLogger.log(`PUT-${JSON.stringify(updatedCliente)}`);
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
