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

  async register(registerParams: loginParams): Promise<any> {
    const user = await this.homeModel
      .findOne({
        name: registerParams.name,
      })
      .exec();
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    await new this.homeModel(registerParams).save();
    return {
      code: 200,
      success: true,
      msg: '注册成功',
    };
  }
}
