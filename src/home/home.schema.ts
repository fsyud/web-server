import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HomeDocument = Home & Document;

@Schema()
export class metaApi extends Document {
  // 其他元信息
  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  comments: number;
}

export const metaApiSchema = SchemaFactory.createForClass(metaApi);

@Schema()
export class Home extends Document {
  @Prop({ required: true })
  img_url: string; // 封面图片

  // 文章发布状态 => 0 草稿，1 已发布
  state: number;

  tags: string;

  @Prop({ required: true })
  desc: string;

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

  @Prop({ required: true, type: metaApiSchema })
  meta: {
    views: number;
    likes?: number;
    comments?: number;
  };

  // 创建时间
  @Prop({ required: true })
  create_times: string;

  // 更新时间
  update_times: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
