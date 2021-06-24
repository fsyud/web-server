import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { AwhileModule } from './awhile/awhile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/blogNest', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    HomeModule,
    AwhileModule,
    LoginModule,
  ],
})
export class AppModule {}
