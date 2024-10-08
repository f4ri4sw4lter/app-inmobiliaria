import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { ConfigSchema } from './schemas/config.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Config', schema: ConfigSchema }
    ])
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfModule { }
