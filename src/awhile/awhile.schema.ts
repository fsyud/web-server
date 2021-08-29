import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

// 一级时刻
@Schema()
export class AwhileProps extends Document {
  // 其他元信息
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: string;

  @Prop({ required: true })
  user_name: string;

  // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
  @Prop({ default: 1 })
  type: number;

  @Prop({ required: true })
  content: string;

  @Prop()
  avatar: string;

  to_user_content?: string;

  @Prop({})
  create_times: string;

  picture_url?: string[];

  links?: string;
}

export const AwhilePropsSchema = SchemaFactory.createForClass(AwhileProps);

@Schema()
export class secondWhileUserProps extends Document {
  @Prop({ type: AwhilePropsSchema })
  user: AwhileProps;

  @Prop({ type: AwhilePropsSchema })
  to_user: AwhileProps;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ validate: /\S+/ })
  reply_content: string;

  @Prop({ default: 1 })
  state: number;

  @Prop({})
  create_times: string;
}

export const secondAwhileUserPropsSchema =
  SchemaFactory.createForClass(secondWhileUserProps);

export type AwhileDocument = Awhile & Document;

@Schema()
export class Awhile {
  // 标签
  @Prop({ required: true })
  tag: number;

  @Prop({ default: 'awhile' })
  name: string;

  // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
  @Prop({ required: true, default: 1 })
  state: number;

  // 是否已经处理过 => 1 是 / 2 否 ；新加的评论需要审核，防止用户添加 垃圾评论
  @Prop({ required: true, default: 2 })
  is_handle: number;

  // 一级评论
  @Prop({ required: true, type: AwhilePropsSchema })
  oneWhile: AwhileProps;

  @Prop({ required: true, type: [secondAwhileUserPropsSchema] })
  secondWhile: secondWhileUserProps[];
}

export const AwhileSchema = SchemaFactory.createForClass(Awhile);
