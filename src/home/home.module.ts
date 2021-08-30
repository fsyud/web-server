import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller';
import { Home, HomeSchema } from './home.schema';
import { Auth, AuthSchema } from './../auth/auth.schema';
import { Comment, CommentSchema } from './../comment/comment.schema';
import { HomeSerivce } from './home.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [HomeSerivce],
  controllers: [HomeController],
})
export class HomeModule {}
