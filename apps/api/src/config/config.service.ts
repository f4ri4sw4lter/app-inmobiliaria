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

    async newBackup(configDTO: ConfigDTO): Promise<Config> {
        const config = await this.configModel.find();
        const newconfig = this.configModel.findByIdAndUpdate(config[0]._id, configDTO, { new: true });
        return newconfig;
    }

    async createBackup() {
        const backupPath = path.resolve('../backups');
        const dbName = 'test';

        return new Promise((resolve, reject) => {

            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

            exec(
                `mongodump --uri="mongodb+srv://wfarias:c2lBn60cvnksJW7S@inmobiliaria.q4bu7rx.mongodb.net/test" --out=./backups/dump-${formattedDate}`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error realizando el backup: ${error.message}`);
                        reject(`Error realizando el backup: ${error.message}`);
                    } else {
                        console.log(`Backup exitoso en: ${backupPath}`);
                        this.newBackup({ lastBackup: formattedDate });
                        resolve(`Backup exitoso en: ${backupPath}`);
                    }
                },
            );
        });
    }

    async recuperateBackup() {

        const Config = await this.getConfig();
        const backupPath = path.resolve('../backups');
        const dbName = 'test';

        return new Promise((resolve, reject) => {

            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

            exec(
                `mongodump --uri="mongodb+srv://wfarias:c2lBn60cvnksJW7S@inmobiliaria.q4bu7rx.mongodb.net/test" --out=./backups/dump-${formattedDate}`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error realizando el backup: ${error.message}`);
                        reject(`Error realizando el backup: ${error.message}`);
                    } else {
                        console.log(`Backup exitoso en: ${backupPath}`);
                        this.newBackup({ lastBackup: formattedDate });
                        resolve(`Backup exitoso en: ${backupPath}`);
                    }
                },
            );
        });
    }

}
