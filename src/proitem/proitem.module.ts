import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Proitem, ProitemSchema } from './proitem.schema';
import { ProitemService } from './proitem.service';
import { ProitemController } from './proitem.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proitem.name, schema: ProitemSchema }]),
  ],
  controllers: [ProitemController],
  providers: [ProitemService],
})
export class ProitemModule {}
