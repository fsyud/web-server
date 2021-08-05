import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Login } from './login.schema';
import { loginParams } from './login.dto';
import { MD5_SUFFIX, md5 } from './../utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private readonly homeModel: Model<Login>,
    // 引入 JwtService
    private readonly jwtService: JwtService,
  ) {}

  // 登录
  async login(loginParams: loginParams): Promise<any> {
    const user = await this.homeModel.findOne({
      name: loginParams.name,
    });

    if (!user) {
      return {
        code: 400,
        msg: '用户未注册！',
      };
    }
    if (user.password !== md5(loginParams.password + MD5_SUFFIX)) {
      return {
        code: 400,
        msg: '密码不正确！',
      };
    }

    const token = this.jwtService.sign(loginParams);

    return {
      success: true,
      msg: '登录成功！',
      token,
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
