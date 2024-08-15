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
import { CreateContratoDTO } from './dto/contrato.dto';
import { Contrato } from './interfaces/contrato.interface';
import { UpdateUsuarioDTO } from 'src/auth/dto/update-usuario.dto';

@Injectable()
export class ContratoService {

    private readonly logger = new Logger(ContratoService.name);

    constructor(@InjectModel('Contrato') private contratoModel: Model<Contrato>) { }

    async getContrato(contratoId: string): Promise<Contrato> {
        const contrato = await this.contratoModel.findById(contratoId);
        return contrato;
    }

    async getContratoByInmuebleId(inmueble: string): Promise<Contrato> {
        const contrato = await this.contratoModel.findOne({ "inmueble._id": inmueble });
        return contrato;
    }

    async getContratoByClienteId(cliente: string): Promise<Contrato[]> {
        const contratos = await this.contratoModel.find({
            $or: [
                { "cliente._id": cliente },
                { "propietario._id": cliente }
            ]
        });
        return contratos;
    }

    async getContratoByPropietarioId(propietario: string): Promise<Contrato[]> {
        const contratos = await this.contratoModel.find({ "propietario._id": propietario });
        return contratos;
    }

    async getContratos(): Promise<Contrato[]> {
        const contratos = await this.contratoModel.find();
        return contratos;
    }

    async createContrato(createContratoDTO: CreateContratoDTO): Promise<Contrato> {
        const newContrato = new this.contratoModel(createContratoDTO);
        await newContrato.save();
        return newContrato;
    }

    async updateContrato(contratoId: string, createContratoDTO: CreateContratoDTO): Promise<Contrato> {
        const updatedContrato = await this.contratoModel.findByIdAndUpdate(
            contratoId,
            createContratoDTO,
            { new: true });
        return updatedContrato;
    }

    async deleteContrato(contratoId: string): Promise<Contrato> {
        const deletedContrato = await this.contratoModel.findByIdAndDelete(contratoId);
        return deletedContrato;
    }

}
