import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HomeDocument = Home & Document;

@Schema()
export class Home extends Document {
  @Prop()
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string; // 文章标题

  @Prop()
  keyword: string; // 关键字 seo

  @Prop()
  author: string; // 作者

  @Prop()
  content: string; // 文章内容
}

export const HomeSchema = SchemaFactory.createForClass(Home);
