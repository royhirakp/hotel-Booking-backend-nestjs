import { Module } from '@nestjs/common';
import { ClodinaryController } from './clodinary.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ClodinaryService } from './clodinary.service';
@Module({
  controllers: [ClodinaryController],
  providers: [ClodinaryService],
})
export class ClodinaryModule {}
