import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Auth } from '../auth/auth.schema';
import { Awhile } from './awhile.schema';
import { awhilePostDto } from './awhile.dto';

@Injectable()
export class AwhileService {
  constructor(
    @InjectModel(Awhile.name) private readonly awhileModel: Model<Awhile>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async getAwhileList(getAwhile: { tag?: number }): Promise<any> {
    const data: any = await this.awhileModel
      .find()
      .where({ tag: getAwhile.tag })
      .sort({ create_times: -1 })
      .exec();
    return data;
  }

  async addOneAwhile(awhilePost: awhilePostDto): Promise<any> {
    const { user_id, content } = awhilePost;

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
        tag: awhilePost.tag,
        state: 1,
        is_handle: 2,
        oneWhile,
      };

      console.log(midCreate);

      const awhileSave = await new this.awhileModel(midCreate).save();

      console.log(awhileSave);
    }
  }
}
