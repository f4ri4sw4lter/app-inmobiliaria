import { Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Mensaje } from './interfaces/mensaje.interface';
import { CreateMensajeDTO } from './dto/mensaje.dto';
@Injectable()
export class MensajeService {
    private readonly logger = new Logger(MensajeService.name);

    constructor(@InjectModel('Mensaje') private mensajeModel: Model<Mensaje>){}

    async getMensajes(): Promise<Mensaje[]>{
        const mensajes = await this.mensajeModel.find();
        return mensajes;
    }

    async createMensaje(createMensajeDTO: CreateMensajeDTO): Promise<Mensaje>{
        const newMensaje = new this.mensajeModel(createMensajeDTO);
        return newMensaje.save();
    }
}
