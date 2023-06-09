import { Module } from '@nestjs/common';
import { PropiedadController } from './propiedad.controller';
import { PropiedadService } from './propiedad.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PropiedadSchema } from './schemas/propiedad.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Propiedad', schema: PropiedadSchema}
    ])
  ],
  controllers: [PropiedadController],
  providers: [PropiedadService]
})
export class PropiedadModule {}
