import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigDTO } from './dto/config.dto';
import { Config } from './interfaces/config.interface';


@Injectable()
export class ConfigService {

    private readonly logger = new Logger(ConfigService.name);

    constructor(@InjectModel('Config') private configModel: Model<Config>){}

    async setConfig(configDTO: ConfigDTO): Promise<Config>{
        const newConfig = new this.configModel(configDTO);
        return newConfig;
    }

    async getConfig(): Promise<Config[]>{
        const configs = await this.configModel.find();
        console.log(configs);
        return configs;
    }

    async newMessage(configDTO: ConfigDTO): Promise<Config>{
        const config = await this.configModel.find();
        const newconfig = this.configModel.findByIdAndUpdate(config[0]._id, configDTO, { new: true });
        return newconfig;
    }

    async noMessage(configDTO: ConfigDTO): Promise<Config>{
        const config = await this.configModel.find();
        const newconfig = this.configModel.findByIdAndUpdate(config[0]._id, configDTO, { new: true });
        return newconfig;
    }

}
