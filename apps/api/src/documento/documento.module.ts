import { Module } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentoSchema } from './schemas/documento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Documentos', schema: DocumentoSchema }
    ])
  ],
  providers: [DocumentoService],
  controllers: [DocumentoController]
})
export class DocumentoModule {}
