import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Home } from './home.schema';
import { CreatePostDto, UpdatePostDto } from './home.dto';
import { IQuery } from './../utils/query.decorator';

type idTypes = string | number;

@Injectable()
export class HomeSerivce {
  constructor(
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
  ) {}

  async createPage(createPost: CreatePostDto): Promise<any> {
    const midCreate = {
      ...createPost,
      ...{
        create_times: moment().format(),
      },
    };
    await new this.homeModel(midCreate).save();
    return {
      msg: '发布成功',
      success: true,
    };
  }

  async getArtList(query: IQuery = {}): Promise<any[]> {
    const { pageSize = 15, page = 1 } = query;
    let skip = 0;
    if (page <= 1) {
      skip == 0;
    } else {
      skip = page - 1;
    }

    const data = await this.homeModel
      .find()
      .limit(pageSize)
      .select(
        'img_url type state tags title keyword author meta create_times update_times',
      )
      .skip(skip * pageSize)
      .sort({ create_times: -1 })
      .exec();

    return data;
  }

  async getOneDetail(id: idTypes): Promise<any> {
    const find = async () => {
      const data = await this.homeModel.findById(id);

      if (data) {
        await this.homeModel.findByIdAndUpdate(id, {
          meta: { views: 3 },
        });
        return data;
      }
    };

    return find();
  }

  async updateArtlist(id: idTypes, updataContent: UpdatePostDto): Promise<any> {
    await this.homeModel.findByIdAndUpdate(id, updataContent);
    return {
      success: true,
    };
  }

  async removeArtlist(id: idTypes): Promise<any> {
    await this.homeModel.findByIdAndDelete(id);
    return {
      msg: '删除成功',
      success: true,
    };
  }
}
