import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigDTO } from './dto/config.dto';
import { Config } from './interfaces/config.interface';
import { exec } from 'child_process';
import * as path from 'path';
const fs = require('fs');
const { Storage } = require('megajs');
const archiver = require('archiver');


@Injectable()
export class ConfigService {

    private readonly logger = new Logger(ConfigService.name);

    constructor(@InjectModel('Config') private configModel: Model<Config>) {
        const cron = require('node-cron');
        //Todos los lunes a las 10:00 AM:
        cron.schedule('0 10 * * 1', () => {
            this.createBackup();
        });
    }

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
        const config = await this.getConfig();
        const newconfig = this.configModel.findByIdAndUpdate(config[0]._id, configDTO, { new: true });
        return newconfig;
    }

    async createBackup() {
        const backupPath = path.resolve('../backups');

        return new Promise((resolve, reject) => {

            const now = new Date();
            const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;

            exec(
                `mongodump --uri="${process.env.DB_URI}" --out=./backups/dump-${formattedDate}`,
                (error, stdout, stderr) => {
                    if (error) {

                        console.error(`Error realizando el backup: ${error.message}`);
                        reject(`Error realizando el backup: ${error.message}`);

                    } else {
                        try {
                            /*LOGICA DE COMPRIMIR EL DUMB */
                            const folderPath = `./backups/dump-${formattedDate}`;
                            const outputZipPath = `./backups/dump-${formattedDate}.zip`;

                            const output = fs.createWriteStream(outputZipPath);
                            const archive = archiver('zip', {
                                zlib: { level: 9 }, // Nivel de compresión (0-9)
                            });

                            // Manejo de eventos
                            output.on('close', () => {
                                console.log(`Archivo .zip creado exitosamente: ${outputZipPath}`);
                                console.log(`Tamaño total: ${archive.pointer()} bytes`);
                            });

                            output.on('end', () => {
                                console.log('Finalizó el proceso de compresión.');
                            });

                            archive.on('warning', (err) => {
                                if (err.code === 'ENOENT') {
                                    console.warn('Advertencia:', err.message);
                                } else {
                                    throw err;
                                }
                            });

                            archive.on('error', (err) => {
                                throw err;
                            });

                            // Enlazar el flujo de archivo con el archivo zip
                            archive.pipe(output);

                            // Agregar la carpeta al archivo zip
                            archive.directory(folderPath, false); // `false` para no incluir la estructura completa

                            // Finalizar el archivo zip
                            archive.finalize();


                            /*LOGICA DE SUBIDA A LA NUBE */
                            const email = 'renzocarletti@hotmail.com';
                            const password = 'pipito1498';

                            const storage = new Storage({
                                email: email,
                                password: password,
                            });

                            storage.on('ready', () => {
                                console.log('Autenticado correctamente en MEGA.');

                                // Ruta al archivo local que deseas subir
                                const localFilePath = `./backups/dump-${formattedDate}.zip`;

                                // Subir archivo
                                const uploadStream = storage.upload({ name: localFilePath, allowUploadBuffering: true }); // Nombre en MEGA
                                fs.createReadStream(localFilePath).pipe(uploadStream);

                                uploadStream.on('complete', (file) => {
                                    console.log('Archivo subido con éxito. Enlace público:', file.link());
                                });

                                uploadStream.on('error', (error) => {
                                    console.error('Error durante la subida:', error.message);
                                });
                            });

                            storage.on('error', (error) => {
                                console.error('Error autenticando en MEGA:', error.message);
                            });

                            console.log(`Backup exitoso en: ${backupPath}`);
                            this.newBackup({ lastBackup: formattedDate });
                            resolve(`Backup exitoso en: ${backupPath}`);
                        } catch (e) {

                        }


                    }
                },
            );
        });
    }

    async recuperateBackup() {
        const backupPath = path.resolve('../backups');
        const dbName = 'test';
        const Config = await this.getConfig();

        return new Promise((resolve, reject) => {

            console.log("CONFIG:", Config);
            exec(
                `mongorestore --uri="${process.env.DB_URI}" --dir=./backups/dump-${Config[0].lastBackup} --drop`,

                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error recuperando el backup: ${error.message}`);
                        reject(`Error recuperando el backup: ${error.message}`);
                    } else {
                        console.log(`Recuperacion exitosa en: ${backupPath}`);
                        resolve(`Recuperacion exitosa en: ${backupPath}`);
                    }
                },
            );
        });
    }

}
