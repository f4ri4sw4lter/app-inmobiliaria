import { Get, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/images.helper';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {

    constructor(private imagesService: ImagesService){}

    @Post('upload/:propiedadId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../client/public/assets/propiedades/',
            filename: renameImage
        }),
        fileFilter: fileFilter,
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('propiedadId') propiedadId){
        return await this.imagesService.createImage({filename: file.filename, propiedadId: propiedadId})
        /*try{
            const image = await this.imagesService.getImages(imagesId);
            return res.status(HttpStatus.OK).json({
                message: 'Cliente',
                cliente: cliente
            });
        }catch(err){
            throw new NotFoundException('Producto no existente');
        }*/
        
    }

    @Get('/:propiedadId')
    async getImages(@Res() res, @Param('propiedadId') propiedadId){
        const images = await this.imagesService.getImages(propiedadId);
        return res.status(HttpStatus.OK).json({
            message: 'Lista de imagenes',
            images: images
        });
    }

}
