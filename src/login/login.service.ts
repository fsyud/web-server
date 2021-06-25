import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './login.schema';
import { loginParams } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private readonly homeModel: Model<Login>,
  ) {}

  async login(loginParams: loginParams): Promise<any> {
    await new this.homeModel(loginParams).
    return {
      success: true,
    };
  }

  async register(registerParams: loginParams): Promise<any> {
    await new this.homeModel(registerParams).save();
    return {
      success: true,
      msg: '注册成功'
    };
  }
}
