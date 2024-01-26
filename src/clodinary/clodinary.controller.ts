import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ClodinaryService } from './clodinary.service';
// import { CloudinaryService } from './cloudinary.service';
@Controller('clodinary')
export class ClodinaryController {
  constructor(private readonly cloudanaryService: ClodinaryService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uplodeFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudanaryService.uploadImage(file.path);
      return result;
    } catch (error) {
      console.log('error on uploding', error);
      throw new Error('Failed to uplode');
    }
  }
}
