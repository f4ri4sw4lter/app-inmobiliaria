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

    async getAlquileres() {
        const alquileres = await this.contratoModel.find({
            $or: [
                { "inmueble.contrato": "Alquiler" },
            ]
        })

        return alquileres;
    }

    async getVentas() {
        const ventas = await this.contratoModel.find({
            $or: [
                { "inmueble.contrato": "Venta" },
            ]
        })

        return ventas;
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

    async getUltimosCinco(): Promise<Contrato[]> {
        const contratos = await this.contratoModel.find().limit(5).exec();
        return contratos;
    }

    async getContratos(): Promise<Contrato[]> {
        const contratos = await this.contratoModel.find();
        return contratos;
    }

    async getContratosLastYear() {
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);

        const contratos = await this.contratoModel.find({
            fecha: { $gte: lastYear }
        });

        const ventas: { [month: string]: number } = {};
        const alquileres: { [month: string]: number } = {};

        // Obtener los últimos 10 meses
        const today = new Date();
        for (let i = 0; i < 10; i++) {
            const month = today.toLocaleString('default', { month: 'numeric' });
            const year = today.getFullYear().toString().slice(-2); // Obtener solo los últimos dos dígitos del año
            const monthYear = `${month}/${year}`; // Crear la combinación de mes/año con los últimos dos dígitos

            if (!ventas[monthYear]) ventas[monthYear] = 0;
            if (!alquileres[monthYear]) alquileres[monthYear] = 0;

            today.setMonth(today.getMonth() - 1);
        }

        // Procesar los contratos
        contratos.forEach((contrato) => {
            const contratoDate = new Date(contrato.fecha);
            const month = contratoDate.toLocaleString('default', { month: 'numeric' });
            const year = contratoDate.getFullYear().toString().slice(-2); // Últimos dos dígitos del año
            const monthYear = `${month}/${year}`;

            if (contrato.inmueble.contrato === 'Venta') {
                if (ventas[monthYear] !== undefined) {
                    ventas[monthYear]++;
                }
            } else if (contrato.inmueble.contrato === 'Alquiler') {
                if (alquileres[monthYear] !== undefined) {
                    alquileres[monthYear]++;
                }
            }
        });

        const orderedVentas = Object.keys(ventas).sort((a, b) => {
            const [monthA, yearA] = a.split('/').map(Number);
            const [monthB, yearB] = b.split('/').map(Number);
            return yearA !== yearB ? yearA - yearB : monthA - monthB;
        });

        // Crear el array en el orden correcto
        const arrayOfIntsVentas = orderedVentas.map(key => ventas[key]);

        const orderedAlquileres = Object.keys(alquileres).sort((a, b) => {
            const [monthA, yearA] = a.split('/').map(Number);
            const [monthB, yearB] = b.split('/').map(Number);
            return yearA !== yearB ? yearA - yearB : monthA - monthB;
        });

        // Crear el array en el orden correcto
        const arrayOfIntsAlquileres = orderedAlquileres.map(key => alquileres[key]);

        return { ventas: arrayOfIntsVentas, alquileres: arrayOfIntsAlquileres };
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
