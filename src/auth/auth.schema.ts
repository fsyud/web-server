import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginDocument = Auth & Document;
@Schema()
export class Auth extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  type: string;

  @Prop()
  username: string;

  @Prop()
  avator_url: string;

  @Prop()
  job: string;

  @Prop()
  company: string;

  @Prop()
  introduce: string;
}

export const LoginSchema = SchemaFactory.createForClass(Auth);
