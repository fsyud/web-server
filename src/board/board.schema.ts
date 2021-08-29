import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export class Board extends Document {
  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  content: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
