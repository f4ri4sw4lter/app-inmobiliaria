import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigDTO } from './dto/config.dto';
import { Config } from './interfaces/config.interface';
import { exec } from 'child_process';
import * as path from 'path';


@Injectable()
export class ConfigService {

    private readonly logger = new Logger(ConfigService.name);

    constructor(@InjectModel('Config') private configModel: Model<Config>) { }

    async setConfig(configDTO: ConfigDTO): Promise<Config> {
        const newConfig = new this.configModel(configDTO);
        return newConfig;
    }

    async getConfig(): Promise<Config[]> {
        const configs = await this.configModel.find();
        console.log(configs);
        return configs;
    }

    async newMessage(configDTO: ConfigDTO): Promise<Config> {
        const config = await this.configModel.find();
        const newconfig = this.configModel.findByIdAndUpdate(config[0]._id, configDTO, { new: true });
        return newconfig;
    }

    async noMessage(configDTO: ConfigDTO): Promise<Config> {
        const config = await this.configModel.find();
        const newconfig = this.configModel.findByIdAndUpdate(config[0]._id, configDTO, { new: true });
        return newconfig;
    }

    async createBackup() {
        const backupPath = path.resolve(__dirname, '..', 'backups');
        const dbName = 'inmobiliaria';

        return new Promise((resolve, reject) => {
            exec(
                `mongodump --uri=${process.env.DB_URI}/${dbName} --out=${backupPath}`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error realizando el backup: ${error.message}`);
                        reject(`Error realizando el backup: ${error.message}`);
                    } else {
                        console.log(`Backup exitoso en: ${backupPath}`);
                        resolve(`Backup exitoso en: ${backupPath}`);
                    }
                },
            );
        });
    }

}
