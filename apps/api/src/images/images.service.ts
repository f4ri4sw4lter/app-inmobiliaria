import { InjectModel } from '@nestjs/mongoose';
import { Images } from './interfaces/images.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ImagesDTO } from './dto/images.dto';

@Injectable()
export class ImagesService {
    constructor( @InjectModel('Images') private imagesModel: Model<Images> ){}

    async getImages(imageId: string): Promise<Images>{
        const image = await this.imagesModel.findById(imageId);
        return image;
    }

    async getImagess(): Promise<Images[]>{
        const images = await this.imagesModel.find();
        return images;
    }

    async createImage(ImagesDTO: ImagesDTO): Promise<Images>{
        const newImage = new this.imagesModel(ImagesDTO);
        await newImage.save();
        return newImage;
    }

    async deleteImage(imageId: string): Promise<Images>{
        const deletedImage = await this.imagesModel.findByIdAndDelete(imageId);
        return deletedImage;
    }
}
