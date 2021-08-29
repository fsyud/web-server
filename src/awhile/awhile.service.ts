import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Auth } from '../auth/auth.schema';
import { Awhile, AwhileDocument } from './awhile.schema';
import { awhilePostDto } from './awhile.dto';

@Injectable()
export class AwhileService {
  constructor(
    @InjectModel(Awhile.name)
    private readonly awhileModel: Model<AwhileDocument>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async getAwhileList(getAwhile: {
    tag?: number;
    sort?: any;
    page?: number;
    pageSize?: number;
  }): Promise<any> {
    const { sort = { create_times: -1 }, tag, pageSize = 20, page } = getAwhile;
    let wheres: any = {};
    let skip = 0;
    if (tag === 999) {
      wheres = {};
    } else {
      wheres.tag = getAwhile.tag;
    }

    console.log(wheres);

    if (page <= 1) {
      skip == 0;
    } else {
      skip = page - 1;
    }

    const data: any = await this.awhileModel
      .find()
      .where(wheres)
      .limit(pageSize)
      .skip(skip * pageSize)
      .sort(sort)
      .exec();
    return data;
  }

  async addOneAwhile(awhilePost: awhilePostDto): Promise<any> {
    const { user_id, content, tag } = awhilePost;

    const userInfo: any = await this.authModel.findById(user_id);

    if (userInfo) {
      const { _id, username, avatar_url, type } = userInfo;

      const oneWhile = {
        user_id: _id,
        user_name: username,
        avatar: avatar_url,
        type,
        content,
        create_times: moment().format(),
      };

      const midCreate: any = {
        state: 1,
        is_handle: 2,
        oneWhile,
      };

      if (!tag) {
        midCreate.tag = 999;
      } else {
        midCreate.tag = awhilePost.tag;
      }
      await new this.awhileModel(midCreate).save();
    }

    return {
      msg: '发布成功',
      success: true,
    };
  }
}
