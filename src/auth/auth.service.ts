import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.schema';
import { userParams } from './auth.dto';
import { MD5_SUFFIX, md5 } from '../utils';
import { IQuery } from './../utils/query.decorator';

type idTypes = string | number;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    // 引入 JwtService
    private readonly jwtService: JwtService,
  ) {}

  // 登录
  async login(loginParams: userParams): Promise<any> {
    const user = await this.authModel.findOne({
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

    const payload = { name: user.name, sub: user._id };

    return {
      success: true,
      msg: '登录成功！',
      access_token: this.jwtService.sign(payload),
      id: user._id,
    };
  }

  // 注册
  async register(registerParams: userParams): Promise<any> {
    const { name, password } = registerParams;

    const user = await this.authModel
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

    await new this.authModel(hushPassword).save();
    return {
      success: true,
      msg: '注册成功',
    };
  }

  // 用户列表
  async getUserList(query: IQuery = {}): Promise<any[]> {
    const { pageSize = 15, page = 1 } = query;
    let skip = 0;
    if (page <= 1) {
      skip == 0;
    } else {
      skip = page - 1;
    }

    const data = await this.authModel
      .find()
      .limit(pageSize)
      .skip(skip * pageSize)
      .exec();

    return data;
  }

  async removeUserlist(id: idTypes): Promise<any> {
    await this.authModel.findByIdAndDelete(id);
    return {
      msg: '删除成功',
      success: true,
    };
  }

  async updateUserInfo(updateBody: userParams): Promise<any> {
    await this.authModel.findByIdAndUpdate(updateBody.id, updateBody);
    return {
      msg: '修改成功',
      success: true,
    };
  }

  async getOneUserInfo(id: string): Promise<any> {
    return this.authModel.findById(id);
  }
}
