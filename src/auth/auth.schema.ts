import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginDocument = Auth & Document;
@Schema()
export class Auth extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  // 1 => 博主 2 => 游客
  @Prop({ required: true })
  type: string;

  @Prop()
  username: string;

  @Prop()
  avatar_url: string;

  @Prop()
  job: string;

  @Prop()
  author_web: string;

  @Prop()
  company: string;

  @Prop()
  introduce: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
