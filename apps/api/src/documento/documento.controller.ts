import { Get, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, HttpException } from '@nestjs/common';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameFile } from './helpers/documento.helper';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import FileLogger from '../../utils/fileLogger'
import { DocumentoService } from './documento.service';

const unlinkAsync = promisify(fs.unlink);

@Controller('documento')
export class DocumentoController {

    private fileLogger = new FileLogger('../client/public/logs/documentos.log');

    constructor(private documentoService: DocumentoService) { }

    @Post('/:reference')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../client/public/docs/',
            filename: renameFile
        }),
        fileFilter: fileFilter,
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('reference') reference, @Param('ownerId') ownrId) {

        this.fileLogger.log(`POST-${file.filename}`);
        return await this.documentoService.createDoc({ filename: file.filename, reference: reference, ownerId: ownrId })
    }

    @Get('/:referenceId')
    async getDocumentos(@Res() res, @Param('referenceId') referenceId: string) {
        const docs = await this.documentoService.getDoc(referenceId);
        this.fileLogger.log(`GET-${JSON.stringify(docs)}`);

        return res.status(HttpStatus.OK).json({
            message: 'Lista de documentos',
            docs: docs
        });
    }

    @Delete('/:docId')
    async deleteDoc(@Res() res, @Param('docId') docId) {

        try {

            const deletedFile = await this.documentoService.deleteFile(docId);
            const filePath = path.join('../client/public/docs/', deletedFile.filename);

            await unlinkAsync(filePath)
            .then(()=>{
                this.fileLogger.log(`DELETE-${JSON.stringify(deletedFile)}`);

                return res.status(HttpStatus.OK).json({
                    message: 'documento eliminado',
                });
            })
            .catch((err)=>{
                this.fileLogger.log(`DELETE-Error-Error al eliminar la documento en el disco`);

                throw new HttpException('Error al eliminar la documento en el disco', HttpStatus.INTERNAL_SERVER_ERROR);
            })

        } catch (err) {
            if (err.code === 'ENOENT') {
                this.fileLogger.log(`DELETE-Error-Archivo no encontrado en el disco`);

                throw new HttpException('Archivo no encontrado en el disco', HttpStatus.NOT_FOUND);
            } else {
                this.fileLogger.log(`DELETE-Error-Error al eliminar la documento en el disco`);
                throw new HttpException('Error al eliminar la documento en el disco', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.fileLogger.log(`DELETE-Error-documento no existente en la base de datos`);

            throw new NotFoundException('documento no existente en la base de datos');
        }
    }
}
