import { Get, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, HttpException } from '@nestjs/common';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/images.helper';
import { ImagesService } from './images.service';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import FileLogger from '../../utils/fileLogger'

const unlinkAsync = promisify(fs.unlink);

@Controller('images')
export class ImagesController {

    private fileLogger = new FileLogger('./logs/imagenes.log');

    constructor(private imagesService: ImagesService) { }

    @Post('upload/propiedad/:referenceId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../client/public/assets/images/propiedades/',
            filename: renameImage
        }),
        fileFilter: fileFilter,
    }))
    async uploadFilePropiedad(@UploadedFile() file: Express.Multer.File, @Param('referenceId') referenceId) {

        this.fileLogger.log(`POST- ${file.filename}`);
        return await this.imagesService.createImage({ filename: file.filename, referenceId: referenceId })
    }

    @Get('/propiedad/:referenceId')
    async getImagesPropiedad(@Res() res, @Param('referenceId') referenceId: string) {
        const images = await this.imagesService.getImages(referenceId);
        this.fileLogger.log(`GET- ${JSON.stringify(images)}`);

        return res.status(HttpStatus.OK).json({
            message: 'Lista de imagenes',
            images: images
        });
    }

    @Delete('/propiedad/:imageId')
    async deleteImagePropiedad(@Res() res, @Param('imageId') imageId) {

        try {

            const deletedImage = await this.imagesService.deleteImage(imageId);
            const filePath = path.join('../client/public/assets/images/propiedades/', deletedImage.filename);

            await unlinkAsync(filePath)
            .then(()=>{
                this.fileLogger.log(`DELETE- ${JSON.stringify(deletedImage)}`);

                return res.status(HttpStatus.OK).json({
                    message: 'Imagen eliminada',
                });
            })
            .catch((err)=>{
                this.fileLogger.log(`DELETE-Error-Error al eliminar la imagen en el disco`);

                throw new HttpException('Error al eliminar la imagen en el disco', HttpStatus.INTERNAL_SERVER_ERROR);
            })

        } catch (err) {
            if (err.code === 'ENOENT') {
                this.fileLogger.log(`DELETE-Error-Archivo no encontrado en el disco`);

                throw new HttpException('Archivo no encontrado en el disco', HttpStatus.NOT_FOUND);
            } else {
                this.fileLogger.log(`DELETE-Error-Error al eliminar la imagen en el disco`);
                throw new HttpException('Error al eliminar la imagen en el disco', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.fileLogger.log(`DELETE-Error-Imagen no existente en la base de datos`);

            throw new NotFoundException('Imagen no existente en la base de datos');
        }
    }


    @Post('upload/usuario/:referenceId')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../client/public/assets/images/usuarios/',
            filename: renameImage
        }),
        fileFilter: fileFilter,
    }))
    async uploadFileUsuario(@UploadedFile() file: Express.Multer.File, @Param('referenceId') referenceId) {
        this.fileLogger.log(`POST-usuario- ${JSON.stringify(file.filename)}`);
        return await this.imagesService.createImage({ filename: file.filename, referenceId: referenceId })
    }

    @Get('/usuario/:referenceId')
    async getImagesUsuario(@Res() res, @Param('referenceId') referenceId: string) {
        const images = await this.imagesService.getImages(referenceId);
        this.fileLogger.log(`GET-usuario- ${JSON.stringify(images)}`);
        return res.status(HttpStatus.OK).json({
            message: 'Lista de imagenes',
            images: images
        });
    }

    @Delete('/usuario/:imageId')
    async deleteImageUsuario(@Res() res, @Param('imageId') imageId) {

        const filePath = path.join(__dirname, '../client/public/assets/images/usuarios/', imageId);

        try {
            await unlinkAsync(filePath);

            try {
                const deletedImage = await this.imagesService.deleteImage(imageId);
                return res.status(HttpStatus.OK).json({
                    message: 'Imagen eliminada',
                });
            } catch (err) {
                throw new NotFoundException('Imagen no existente en la base de datos');
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                // File does not exist
                throw new HttpException('Archivo no encontrado en el disco', HttpStatus.NOT_FOUND);
            } else {
                // Other errors
                throw new HttpException('Error al eliminar la imagen en el disco', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

}