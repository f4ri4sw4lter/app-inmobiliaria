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
import { Cliente } from './interfaces/cliente.interface';
import { CreateClienteDTO } from './dto/cliente.dto';


@Injectable()
export class ClienteService{
    private readonly logger = new Logger(ClienteService.name);

    constructor(@InjectModel('Cliente') private clienteModel: Model<Cliente>){}

    async getCliente(clienteId: string): Promise<Cliente>{
        const cliente = await this.clienteModel.findById(clienteId);
        return cliente;
    }

    async getClientes(): Promise<Cliente[]>{
        const clientes = await this.clienteModel.find();
        return clientes;
    }

    async createCliente(createClienteDTO: CreateClienteDTO): Promise<Cliente>{
        const newCliente = new this.clienteModel(createClienteDTO);
        await newCliente.save();
        return newCliente;
    }

    async updateCliente(clienteId: string, createClienteDTO: CreateClienteDTO): Promise<Cliente>{
        const updatedCliente = await this.clienteModel.findByIdAndUpdate(
            clienteId, 
            createClienteDTO,
            { new: true });
        return updatedCliente;
    }

    async deleteCliente(clienteId: string): Promise<Cliente>{
        const deletedCliente = await this.clienteModel.findByIdAndDelete(clienteId);
        return deletedCliente;
    }
}
