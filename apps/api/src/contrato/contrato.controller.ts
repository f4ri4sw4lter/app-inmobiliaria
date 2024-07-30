import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import FileLogger from '../../utils/fileLogger'
import { ContratoService } from './contrato.service';
import { CreateContratoDTO } from './dto/contrato.dto';

@Controller('contrato')
export class ContratoController {

    private readonly logger = new Logger(ContratoController.name);
    private fileLogger = new FileLogger('../client/public/logs/clientes.log');

    constructor(private contratoService: ContratoService){}

    @Post('/')
    @UseGuards(AuthGuard)
    async createContrato(@Res() res, @Body() createContratoDTO:CreateContratoDTO){
        this.logger.log('POST - Creando contrato.');
        const newContrato = await this.contratoService.createContrato(createContratoDTO);
        this.fileLogger.log(`POST-${JSON.stringify(newContrato)}`);

        return res.status(HttpStatus.OK).json({
            message: 'Cliente creado',
            cliente: newContrato
        });
    }

    @Get('/')
    @UseGuards(AuthGuard)
    async getContratos(@Res() res){
        this.logger.log('GET - lista de contratos.');
        const contratos = await this.contratoService.getContratos();
        this.fileLogger.log(`GET-${JSON.stringify(contratos)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Lista de contratos',
            contratos: contratos
        });
    }

    @Get('/:contratoId')
    @UseGuards(AuthGuard)
    async getContrato(@Res() res, @Param('contratoId') contratoId){
        this.logger.log('GET - contrato.');
        try{
            const contrato = await this.contratoService.getContrato(contratoId);
            this.fileLogger.log(`GET-${JSON.stringify(contrato)}`);
            return res.status(HttpStatus.OK).json({
                message: 'contrato',
                contrato: contrato
            });
        }catch(err){
            throw new NotFoundException('Contrato no existente');
            this.fileLogger.log(`GET-error`);
        }
        
    }

    @Delete('/:contratoId')
    @UseGuards(AuthGuard)
    async deleteContrato(@Res() res, @Param('contratoId') contratoId){
        this.logger.log('DELETE - Borrando contrato.');
        try{
            const deletedContrato = await this.contratoService.deleteContrato(contratoId);
            if(deletedContrato === null){
                this.fileLogger.log(`DELETE-Error`);
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Contrato inexistente'
                }); 
            }else{
                this.fileLogger.log(`DELETE-${JSON.stringify(deletedContrato)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'Contrato eliminado correctamente',
                    contrato: deletedContrato
                }); 
            }
            
        }catch(err){
            throw err;
        }
    }

    @Put('/:contratoId')
    @UseGuards(AuthGuard)
    async updateContrato(@Res() res, @Body() createContratoDTO:CreateContratoDTO, @Param('contratoId') contratoId){
        this.logger.log('PUT - Actualizando contrato.');
        try{
            const updatedContrato = await this.contratoService.updateContrato(contratoId, createContratoDTO);
            if(updatedContrato === null){
                this.fileLogger.log(`PUT-Error`);
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Contrato inexistente'
                }); 
            }else{
                this.fileLogger.log(`PUT-${JSON.stringify(updatedContrato)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'Contrato actualizado',
                    contrato: updatedContrato
                }); 
            }
        }catch(err){
            throw err;
        }
    }

}
