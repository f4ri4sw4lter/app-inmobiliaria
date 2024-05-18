import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesSchema } from './schemas/images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Images', schema: ImagesSchema }
    ])
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
