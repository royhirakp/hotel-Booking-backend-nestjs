import {
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
  Controller,
  Get,
  UseGuards,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './room.service';
import { CloudinaryuplodeService } from './cloudinaryuplode.service';
@Controller('room')
export class RoomController {
  constructor(
    // private itemService: RoomService,
    private readonly cloudanaryService: CloudinaryuplodeService,
    private readonly roomDataUpload: RoomService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uplodeFile(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    room: any, //room dto
  ) {
    try {
      // const result = await this.cloudanaryService.uploadImage(file.path);
      // console.log(result.url);

      const data = [];
      const upload = await this.roomDataUpload.uploadRoomData(
        'result.url',
        room,
      );
      return upload;
      // console.log(file);
      // return { file };
    } catch (error) {
      console.log('error on uploding', error);
      throw new Error('Failed to uplode');
    }
  }

  @Get('/home')
  getRoomsForHomePage() {
    return this.roomDataUpload.getRoomDataForHomePage();
  }
  @Get('/all')
  getAllRooms() {
    return this.roomDataUpload.getAllRooms();
  }
  @Get('/unit/:id')
  getRoomsById(@Param('id') id: string) {
    return this.roomDataUpload.getRoomDataById(id);
  }
}

// @Get()
// @UseGuards(AuthGuard())
// async getAllItmes(): Promise<any> {
//   return this.itemService.findAllBooks();
// }
