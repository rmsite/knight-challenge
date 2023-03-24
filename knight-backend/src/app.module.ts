import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightModule } from './knight/knight.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/knight-challenge', {
      useNewUrlParser: true,
    }),
    KnightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
