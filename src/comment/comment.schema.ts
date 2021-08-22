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
}

@Schema()
export class secondCommitUserProps extends Document {
  @Prop({ type: CommitProps })
  user: string;

  @Prop({ type: CommitProps })
  to_user: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ required: true, validate: /\S+/ })
  content: number;

  @Prop({ default: 1 })
  state: number;

  @Prop({ required: true })
  create_times: string;
}

export const CommitPropsSchema = SchemaFactory.createForClass(CommitProps);
export const secondCommitUserPropsSchema = SchemaFactory.createForClass(
  secondCommitUserProps,
);

@Schema()
export class Comment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  article_id: any;

  @Prop({ required: true, validate: /\S+/ })
  content: string;

  @Prop({ required: true })
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

  // 一级评论
  @Prop({ type: CommitPropsSchema })
  oneComment: {
    // 用户id
    user_id: any;

    // 名字
    user_name: string;

    // 用户类型 0：博主 1：其他用户
    type: number;

    // 头像
    avatar: string;
  };

  @Prop({ type: secondCommitUserPropsSchema })
  secondCommit: {
    // 谁在评论
    user: {
      user_id: string;

      // 名字
      user_name: string;

      // 用户类型 0：博主 1：其他用户
      type: number;

      // 头像
      avatar: string;
    };
    // 对谁评论
    to_user: {
      user_id: string;

      // 名字
      user_name: string;

      // 用户类型 0：博主 1：其他用户
      type: number;

      // 头像
      avatar: string;
    };

    // 被赞数
    likes: number;

    // content
    content: string;

    // 状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
    state: number;
    // 创建日期
    create_time: string;
  };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
