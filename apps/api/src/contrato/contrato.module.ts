import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContratoSchema } from './schemas/contrato.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contrato', schema: ContratoSchema }
    ])
  ],
  providers: [ContratoService],
  controllers: [ContratoController],
  exports: [ContratoService]
})
export class ContratoModule { }
