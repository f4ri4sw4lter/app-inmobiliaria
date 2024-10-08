import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ContratoModule } from 'src/contrato/contrato.module';
import { MensajeModule } from 'src/mensaje/mensaje.module';
import { PropiedadModule } from 'src/propiedad/propiedad.module';

@Module({
  imports: [ ClienteModule, ContratoModule, MensajeModule, PropiedadModule ],
  controllers: [MetricsController],
  providers: [MetricsService ]
})
export class MetricsModule {}
