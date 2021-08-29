import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from '../auth/auth.schema';
import { Awhile, AwhileSchema } from './awhile.schema';
import { AwhileService } from './awhile.service';
import { AwhileController } from './awhile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Awhile.name, schema: AwhileSchema }]),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AwhileController],
  providers: [AwhileService],
})
export class AwhileModule {}
