import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HomeDocument = Home & Document;

@Schema()
export class Home extends Document {
  img_url: string; // 封面图片

  // 文章发布状态 => 0 草稿，1 已发布
  state: number;

  tags: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  title: string; // 文章标题

  keyword: string; // 关键字 seo

  @Prop({ required: true })
  author: string; // 作者

  @Prop({ required: true })
  content: string; // 文章内容

  // 其他元信息
  meta: {
    views: number;
    likes: number;
    comments: number;
  };

  // 创建时间
  create_time: Date;

  update_time: Date;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
