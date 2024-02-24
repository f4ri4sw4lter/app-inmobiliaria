import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { CreatePropiedadDTO } from './dto/propiedad.dto';
import { PropiedadService } from './propiedad.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('propiedad')
export class PropiedadController {

    private readonly logger = new Logger(PropiedadController.name);
    
    constructor(private propiedadService: PropiedadService){}

    //Agregar try
    @Post('/create')
    async createPropiedad(@Res() res, @Body() createPropiedadDTO:CreatePropiedadDTO){
        this.logger.log('POST - Creando propiedad.');
        const newPropiedad = await this.propiedadService.createPropiedad(createPropiedadDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Producto creado',
            propiedad: newPropiedad
        });
    }

    //Agregar try
    @Get('/')
    @UseGuards(AuthGuard)
    async getPropiedades(@Res() res){
        this.logger.log('GET - lista de propiedades.');
        const propiedades = await this.propiedadService.getPropiedades();
        return res.status(HttpStatus.OK).json({
            message: 'Lista de propiedades',
            propiedades: propiedades
        });
    }

    @Get('/:propiedadId')
    @UseGuards(AuthGuard)
    async getPropiedad(@Res() res, @Param('propiedadId') propiedadId){
        this.logger.log('GET - propiedad.');
        try{
            const propiedad = await this.propiedadService.getPropiedad(propiedadId);
            return res.status(HttpStatus.OK).json({
                message: 'Propiedad',
                propiedad: propiedad
            });
        }catch(err){
            throw new NotFoundException('Producto no existente');
        }
        
    }

    @Delete('/delete/:propiedadId')
    @UseGuards(AuthGuard)
    async deletePropiedad(@Res() res, @Param('propiedadId') propiedadId){
        this.logger.log('DELETE - Borrando propiedad.');
        try{
            const deletedPropiedad = await this.propiedadService.deletePropiedad(propiedadId);
            if(deletedPropiedad === null){
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Propiedad inexistente'
                }); 
            }else{
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
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'Propiedad inexistente'
                }); 
            }else{
                return res.status(HttpStatus.OK).json({
                    message: 'Propiedad actualizada',
                    producto: updatedPropiedad
                }); 
            }
        }catch(err){
            throw err;
        }
    }
}
