import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import FileLogger from '../../utils/fileLogger'
@Controller('config')
export class ConfigController {


    private readonly logger = new Logger(ConfigController.name);
    private fileLogger = new FileLogger('../client/public/logs/config.log');

    constructor(private configService: ConfigService) { }

    async noConfig() {
        return this.configService.setConfig({ unreadMsgs: true });
    }

    @Get('/')
    @UseGuards(AuthGuard)
    async getConfig(@Res() res) {

        this.logger.log('GET - Config.');
        const config = await this.configService.getConfig();

        if (config.length == 0) {

            const newConfig = await this.noConfig()
            this.fileLogger.log(`GET-${JSON.stringify(newConfig)}`);
            return res.status(HttpStatus.OK).json({
                message: 'Lista de configuraciones',
                config: newConfig
            });

        } else {

            this.fileLogger.log(`GET-${JSON.stringify(config)}`);
            return res.status(HttpStatus.OK).json({
                message: 'Lista de configuraciones',
                config: config
            });
        }
    }

    @Post('/newMessage')
    @UseGuards(AuthGuard)
    async newMessage(@Res() res) {
        this.logger.log('POST - new Message.');

        const config = await this.configService.newMessage({ unreadMsgs: true })

        return res.status(HttpStatus.OK).json({
            message: 'Mensajes sin leer',
            config: config
        });
    }

    @Post('/noMessage')
    @UseGuards(AuthGuard)
    async noMessage(@Res() res) {
        this.logger.log('POST - no Message.');

        const config = await this.configService.noMessage({ unreadMsgs: false })

        return res.status(HttpStatus.OK).json({
            message: 'no hay mensajes',
        });
    }

    @Post('/createBackup')
    async createBackup(@Res() res) {
        this.logger.log('POST - create back up.');

        await this.configService.createBackup();

        return res.status(HttpStatus.OK).json({
            message: 'Backup OK',
        });
    }

    @Post('/recuperateBackup')
    async recuperateBackup(@Res() res) {
        this.logger.log('POST - recuperate back up.');

        await this.configService.recuperateBackup();

        return res.status(HttpStatus.OK).json({
            message: 'Recuperate OK',
        });
    }

}
