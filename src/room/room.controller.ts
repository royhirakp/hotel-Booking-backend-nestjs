import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private itemService: RoomService) {}
  @Get()
  @UseGuards(AuthGuard())
  async getAllItmes(): Promise<any> {
    return this.itemService.findAllBooks();
  }
}
