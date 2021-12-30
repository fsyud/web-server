import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './../auth/auth.schema';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type HomeDocument = Home & Document;

@Schema()
export class metaApi extends Document {
  // 其他元信息
  @Prop({ default: 0 })
  views: number;

  @Prop({ default: [] })
  likes: any[];

  @Prop({ default: 0 })
  comments: number;
}

export const metaApiSchema = SchemaFactory.createForClass(metaApi);
@Schema()
export class Home extends Document {
  @Prop({ required: true })
  img_url: string; // 封面图片

  // 文章发布状态 => 1 草稿 2 未审核 3 已审核
  @Prop({ required: true })
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

  author: string; // 作者

  @Prop({ required: true })
  content: string; // 文章内容

  @Prop({ required: true, type: metaApiSchema })
  meta: metaApi;

  // 创建时间
  @Prop({ required: true })
  create_times: string;

  // 更新时间
  update_times: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  user_id: string;

  @Prop({ required: true, type: AuthSchema, ref: 'Auth' })
  author_user_info: Auth;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
