import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './login.schema';
import { loginParams } from './login.dto';
import { MD5_SUFFIX, md5 } from './../utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private readonly homeModel: Model<Login>,
  ) {}

  // 登录
  async login(loginParams: loginParams): Promise<any> {
    const user = await this.homeModel.findOne({
      name: loginParams.name,
    });
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    // await new this.homeModel(loginParams).
    return {
      success: true,
    };
  }

  // 注册
  async register(registerParams: loginParams): Promise<any> {
    const { name, password } = registerParams;

    const user = await this.homeModel
      .findOne({
        name,
      })
      .exec();

    if (user) {
      return {
        msg: '用户已存在',
      };
    }
    const hushPassword = {
      name,
      password: md5(password + MD5_SUFFIX),
    };

    await new this.homeModel(hushPassword).save();
    return {
      success: true,
      msg: '注册成功',
    };
  }
}
