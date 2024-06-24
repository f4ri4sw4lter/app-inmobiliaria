/**
 * Importaciones externas
 */
import { Test, TestingModule } from '@nestjs/testing';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
/**
 * Importaciones internas
 */
import { Propiedad } from './interfaces/propiedad.interface';
import { CreatePropiedadDTO, UpdatePropiedadDTO } from './dto/propiedad.dto';


@Injectable()
export class PropiedadService{
    private readonly logger = new Logger(PropiedadService.name);

    constructor(@InjectModel('Propiedad') private propiedadModel: Model<Propiedad>){}

    async getPropiedad(propiedadId: string): Promise<Propiedad>{
        const propiedad = await this.propiedadModel.findById(propiedadId);
        return propiedad;
    }

    async getPropiedades(): Promise<Propiedad[]>{
        const propiedades = await this.propiedadModel.find();
        return propiedades;
    }

    async createPropiedad(createPropiedadDTO: CreatePropiedadDTO): Promise<Propiedad>{
        const newPropiedad = new this.propiedadModel(createPropiedadDTO);
        await newPropiedad.save();
        return newPropiedad;
    }

    async updatePropiedad(propiedadId: string, updatePropiedadDTO: UpdatePropiedadDTO): Promise<Propiedad>{
        console.log('Actualizando propiedad', updatePropiedadDTO);
        const updatedPropiedad = await this.propiedadModel.findByIdAndUpdate(
            propiedadId, 
            updatePropiedadDTO,
            { new: true });
        return updatedPropiedad;
    }

    async deletePropiedad(propiedadId: string): Promise<Propiedad>{
        const deletedPropiedad = await this.propiedadModel.findByIdAndDelete(propiedadId);
        return deletedPropiedad;
    }
}
