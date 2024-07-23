import { Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Mensaje } from './interfaces/mensaje.interface';
import { CreateMensajeDTO } from './dto/mensaje.dto';
@Injectable()
export class MensajeService {
    private readonly logger = new Logger(MensajeService.name);

    constructor(@InjectModel('Mensaje') private mensajeModel: Model<Mensaje>){}

    async getMensajes(isNoLeido): Promise<Mensaje[]>{
        const mensajes = await this.mensajeModel.find(isNoLeido);
        return mensajes;
    }

    async createMensaje(createMensajeDTO: CreateMensajeDTO): Promise<Mensaje>{
        const newMensaje = new this.mensajeModel(createMensajeDTO);
        return newMensaje.save();
    }

    async deleteMensaje(mensajeId: string){
        const deleted = await this.mensajeModel.findByIdAndDelete(mensajeId);
        if(!deleted){
            throw new NotFoundException('El mensaje no existe');
        }
        return deleted;
    }

    async updateMensaje(mensajeId: string, updateMensajeDTO: CreateMensajeDTO){
        const updated = await this.mensajeModel.findByIdAndUpdate(mensajeId,updateMensajeDTO,{new:true});
        if(!updated){
            throw new NotFoundException('El mensaje no existe');
        }
        return updated;
    }
}
