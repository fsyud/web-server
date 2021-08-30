import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

// 一级评论
@Schema()
export class CommitProps extends Document {
  // 其他元信息
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user_id: string;

  @Prop({ default: '' })
  user_name: string;

  @Prop({ default: 1 })
  type: number;

  @Prop()
  avatar: string;

  to_user_content?: string;
}

export const CommitPropsSchema = SchemaFactory.createForClass(CommitProps);
@Schema()
export class secondCommitUserProps extends Document {
  @Prop({ type: CommitPropsSchema })
  user: any;

  @Prop({ type: CommitPropsSchema })
  to_user: any;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ validate: /\S+/ })
  reply_content: string;

  @Prop({ default: 1 })
  state: number;

  @Prop({})
  create_times: string;
}

export const secondCommitUserPropsSchema = SchemaFactory.createForClass(
  secondCommitUserProps,
);

@Schema()
export class Comment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'HomeSchema' })
  article_id: any;

  @Prop({ required: true })
  article_title: string;

  @Prop({ validate: /\S+/ })
  content: string;

  @Prop({})
  name: string;

  // 被赞数
  @Prop({ default: 0 })
  likes: number;

  // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
  @Prop({ default: 1 })
  state: number;

  // 是否已经处理过 => 1 是 / 2 否 ；新加的评论需要审核，防止用户添加 垃圾评论
  @Prop({ default: 2 })
  is_handle: number;

  // 创建时间
  @Prop({})
  create_times: string;

  // 一级评论
  @Prop({ type: CommitPropsSchema })
  oneComment: CommitProps;

  @Prop({ required: true, type: [secondCommitUserPropsSchema] })
  secondCommit: secondCommitUserProps[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
