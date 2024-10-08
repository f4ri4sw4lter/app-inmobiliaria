import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import FileLogger from '../../utils/fileLogger'
import { MetricsService } from './metrics.service';


@Controller('metrics')
export class MetricsController {

    private readonly logger = new Logger(MetricsController.name);
    private fileLogger = new FileLogger('../client/public/logs/metrics.log');

    constructor(private metricsService: MetricsService){}

    @Get('/')
    async createContrato(@Res() res){
        this.logger.log('GET - Obteniendo metricas generales.');
        const allMetrics = await this.metricsService.getAll();
        this.fileLogger.log(`GET-${JSON.stringify(allMetrics)}`);

        return res.status(HttpStatus.OK).json({
            message: 'Lista de metricas',
            metrics: allMetrics
        });
    }

}
