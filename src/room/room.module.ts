import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryuplodeService } from './cloudinaryuplode.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './schemas/room.schema';
// import { RoomSchema } from './schemas/room.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'hotelRoom2', schema: RoomSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
    // mongoose model
  ],
  controllers: [RoomController],
  providers: [RoomService, CloudinaryuplodeService],
})
export class RoomModule {}
