import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.db_url),
    AuthModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
