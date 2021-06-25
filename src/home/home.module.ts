import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller';
import { Home, HomeSchema } from './home.schema';
import { HomeSerivce } from './home.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
  ],
  providers: [HomeSerivce],
  controllers: [HomeController],
})
export class HomeModule {}
