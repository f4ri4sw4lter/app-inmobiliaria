import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocDTO } from './dto/documento.dto';
import { Documento } from './interfaces/documento.interface';

@Injectable()
export class DocumentoService {
    constructor( @InjectModel('Documentos') private documentoModel: Model<Documento> ){}

    async getDoc(ownerId: string): Promise<Documento[]>{
        const file = await this.documentoModel.find({ownerId});
        return file;
    }

    async getAllDocs(): Promise<Documento[]>{
        const files = await this.documentoModel.find();
        return files;
    }

    async createDoc(docDTO: DocDTO): Promise<Documento>{
        const newFile = new this.documentoModel(docDTO);
        await newFile.save();
        return newFile;
    }

    async deleteFile(fileId: string): Promise<Documento>{
        const deletedFile = await this.documentoModel.findByIdAndDelete(fileId);
        return deletedFile;
    }
}
