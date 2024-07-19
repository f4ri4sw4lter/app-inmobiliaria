import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MensajeSchema } from './schemas/mensaje.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Mensaje', schema: MensajeSchema}
    ])
  ],
  providers: [MensajeService],
  controllers: [MensajeController]
})
export class MensajeModule {}
