import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { CreatePropiedadDTO } from './dto/propiedad.dto';
import { PropiedadService } from './propiedad.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import FileLogger from '../../utils/fileLogger'

//@UseGuards(JwtAuthGuard)
@Controller('propiedad')
export class PropiedadController {

    private readonly logger = new Logger(PropiedadController.name);
    private fileLogger = new FileLogger('./logs/inmuebles.log');
    
    constructor(private propiedadService: PropiedadService){}

    //Agregar try
    @Post('/create')
    async createPropiedad(@Res() res, @Body() createPropiedadDTO:CreatePropiedadDTO){
        this.logger.log('POST - Creando propiedad.');
        const newPropiedad = await this.propiedadService.createPropiedad(createPropiedadDTO);
        this.fileLogger.log(`POST-${JSON.stringify(newPropiedad)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Propiedad creada',
            propiedad: newPropiedad
        });
    }

    //Agregar try
    @Get('/')
    async getPropiedades(@Res() res){
        this.logger.log('GET - lista de propiedades.');
        const propiedades = await this.propiedadService.getPropiedades();
        this.fileLogger.log(`GET-${JSON.stringify(propiedades)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Lista de propiedades',
            propiedades: propiedades
        });
    }

    @Get('/:propiedadId')
    async getPropiedad(@Res() res, @Param('propiedadId') propiedadId){
        this.logger.log('GET - propiedad.');
        try{
            const propiedad = await this.propiedadService.getPropiedad(propiedadId);
            this.fileLogger.log(`GET-${JSON.stringify(propiedad)}`);
            return res.status(HttpStatus.OK).json({
                message: 'Propiedad',
                propiedad: propiedad
            });
        }catch(err){
            this.fileLogger.log(`GET-Error-Propiedad no existente`);
            throw new NotFoundException('Propiedad no existente');
        }
        
    }

    @Get('/cliente/:clienteId')
    async getPropiedadByCliente(@Res() res, @Param('clienteId') clienteId){
        this.logger.log('GET - propiedad.');
        try{
            const propiedades = await this.propiedadService.getPropiedadesByCliente({propietario: clienteId});
            this.fileLogger.log(`GET-${JSON.stringify(propiedades)}`);
            return res.status(HttpStatus.OK).json({
                message: 'Lista de propiedades',
                propiedades: propiedades
            });
        }catch(err){
            this.fileLogger.log(`GET-Error-Propiedad no existente`);
            throw new NotFoundException('Propiedad no existente');
        }
        
    }

    @Delete('/delete/:propiedadId')
    @UseGuards(AuthGuard)
    async deletePropiedad(@Res() res, @Param('propiedadId') propiedadId){
        this.logger.log('DELETE - Borrando propiedad.');
        try{
            const deletedPropiedad = await this.propiedadService.deletePropiedad(propiedadId);
            if(deletedPropiedad === null){
                this.fileLogger.log(`DELETE-Error-Propiedad no existente`);
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Propiedad inexistente'
                }); 
            }else{
                this.fileLogger.log(`DELETE-${JSON.stringify(deletedPropiedad)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'Propiedad eliminada correctamente',
                    propiedad: deletedPropiedad
                }); 
            }
            
        }catch(err){
            throw err;
        }
    }

    @Put('/update/:propiedadId')
    @UseGuards(AuthGuard)
    async updatePropiedad(@Res() res, @Body() createPropiedadDTO, @Param('propiedadId') propiedadId){
        this.logger.log('PUT - Actualizando propiedad.');
        try{
            const updatedPropiedad = await this.propiedadService.updatePropiedad(propiedadId, createPropiedadDTO);
            if(updatedPropiedad === null){
                this.fileLogger.log(`PUT-Error-Propiedad no existente`);
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Propiedad inexistente'
                }); 
            }else{
                this.fileLogger.log(`PUT-${JSON.stringify(updatedPropiedad)}`);
                return res.status(HttpStatus.OK).json({
                    message: 'Propiedad actualizada',
                    propiedad: updatedPropiedad
                }); 
            }
        }catch(err){
            throw err;
        }
    }
}
