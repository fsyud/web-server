import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  article_id: any;

  @Prop({ required: true, validate: /\S+/ })
  content: string;

  @Prop()
  name: string;

  // 被赞数
  @Prop({ required: true, default: 0 })
  likes: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'HomeSchema',
  })
  user_id: string;

  // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
  @Prop({ required: true, default: 1 })
  state: number;

  // 是否已经处理过 => 1 是 / 2 否 ；新加的评论需要审核，防止用户添加 垃圾评论
  @Prop({ required: true, default: 2 })
  is_handle: number;

  // 创建时间
  @Prop({ required: true })
  create_times: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
