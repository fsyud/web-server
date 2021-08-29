import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/auth.guard';
import { CommonModule } from './common/common.module';
import { CommentModule } from './comment/comment.module';
import { AwhileModule } from './awhile/awhile.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/blogNest', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    HomeModule,
    AuthModule,
    CommonModule,
    CommentModule,
    AwhileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
