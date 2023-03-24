import { Module } from '@nestjs/common';
import { KnightService } from './knight.service';
import { KnightController } from './knight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightSchema } from './schemas/knight-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema }]),
  ],
  providers: [KnightService],
  controllers: [KnightController],
})
export class KnightModule {}
