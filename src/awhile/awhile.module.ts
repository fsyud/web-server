import { Module } from '@nestjs/common';
import { AwhileController } from './awhile.controller';

@Module({
  controllers: [AwhileController],
})
export class AwhileModule {}
