import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Auth } from '../auth/auth.schema';
import { Awhile, AwhileDocument } from './awhile.schema';
import { awhilePostDto, secondawhileDto } from './awhile.dto';

@Injectable()
export class AwhileService {
  constructor(
    @InjectModel(Awhile.name)
    private readonly awhileModel: Model<AwhileDocument>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  /**
   * @description: 获取时刻所有列表
   * @param {*}
   * @return {*}
   */
  async getAwhileList(getAwhile: {
    tag?: number;
    sort?: any;
    page?: number;
    pageSize?: number;
  }): Promise<any> {
    const {
      sort = { 'oneWhile.create_times': -1 },
      tag,
      pageSize = 20,
      page,
    } = getAwhile;
    let wheres: any = {};
    let skip = 0;
    if (tag === 999) {
      wheres = {};
    } else {
      wheres.tag = getAwhile.tag;
    }

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

  /**
   * @description: 添加一级时刻
   * @param {awhilePostDto} awhilePost
   * @return {*}
   */
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
        meta: {
          likes: 0,
          comments: 0,
        },
      };

      if (!tag) {
        midCreate.tag = 999;
      } else {
        midCreate.tag = awhilePost.tag;
      }
      await new this.awhileModel(midCreate).save();
    }

    return {
      msg: '发布成功，博主审核中...',
      success: true,
    };
  }

  /**
   * @description: 添加二级时刻
   * @param {secondawhileDto} awhilePost
   * @return {*}
   */
  async addTwoAwhile(awhilePost: secondawhileDto): Promise<any> {
    const { content, reply_to_user_id, user_id, awhile_id } = awhilePost;

    let obj: any = {};

    const awhileInfo: any = await this.awhileModel.findById(awhile_id);

    if (!awhileInfo) {
      return {
        msg: '该评论已删除！',
        success: true,
      };
    }

    const userInfo: any = await this.authModel.findById(user_id);

    const toUserInfo = await this.authModel.findById(reply_to_user_id);

    if (!userInfo || !toUserInfo) {
      return;
    }

    obj.user = {
      user_id,
      user_name: userInfo.username,
      type: userInfo.type,
      avatar: userInfo.avatar_url,
    };

    obj.to_user = {
      user_id: reply_to_user_id,
      user_name: toUserInfo.username,
      type: userInfo.type,
      avatar: toUserInfo.avatar_url,
    };

    obj = {
      ...obj,
      ...{ reply_content: content, state: 0, create_times: moment().format() },
    };

    awhileInfo.secondWhile.push(obj);

    awhileInfo.meta = {
      comments: awhileInfo.meta.comments + 1,
      likes: awhileInfo.meta.likes,
    };

    await this.awhileModel.findByIdAndUpdate(awhile_id, awhileInfo);

    return {
      msg: '回复成功！',
      success: true,
    };
  }

  /**
   * @description: 删除一级时刻
   * @param {string} id
   * @return {*}
   */
  async removeOneAwhile(id: string): Promise<any> {
    console.log(id);
    await this.awhileModel.findByIdAndDelete(id);
    return {
      msg: '删除成功',
      success: true,
    };
  }
}
