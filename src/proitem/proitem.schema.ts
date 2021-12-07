import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Proitem extends Document {
  @Prop({ default: 'proitem' })
  name: string;

  @Prop({ required: true })
  title: string; // 项目标题

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  img_url: string; // 项目封面图片

  @Prop({ required: true })
  links: string; // 项目封面图片

  // 创建时间
  @Prop({ required: true })
  create_times: string;

  // 更新时间
  update_times: string;

  author: string;

  tags: string;
}

export const ProitemSchema = SchemaFactory.createForClass(Proitem);
