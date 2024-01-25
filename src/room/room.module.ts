import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    // mongoose model
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
