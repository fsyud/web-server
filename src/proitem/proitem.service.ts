import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';

import { Proitem } from './proitem.schema';

import { CreatePostDto, IQuery } from './proitem.dto';

@Injectable()
export class ProitemService {
  constructor(
    @InjectModel(Proitem.name) private readonly proitemModel: Model<Proitem>,
  ) {}

  /**
   * @description: 创建项目
   * @param {CreatePostDto} createPost
   * @return {*}
   */
  async createItem(createPost: CreatePostDto): Promise<any> {
    const midItem: any = {
      ...{
        create_times: moment().format(),
      },
      ...createPost,
    };

    await new this.proitemModel(midItem).save();
  }

  /**
   * @description: 删除项目
   * @param {string} id
   * @return {*}
   */
  async deleteItem(id: string): Promise<any> {
    await this.proitemModel.findByIdAndDelete(id);
    return {
      msg: '删除成功',
      success: true,
    };
  }

  /**
   * @description: 更新项目
   * @param {string} id
   * @param {CreatePostDto} updateContent
   * @return {*}
   */
  async updateItem(id: string, updateContent: CreatePostDto): Promise<any> {
    const midUpdate: any = {
      ...updateContent,
      ...{
        update_times: moment().format(),
      },
    };
    await this.proitemModel.findByIdAndUpdate(id, midUpdate);
    return {
      success: true,
    };
  }

  /**
   * @description: 获取所有项目
   * @param {IQuery} query
   * @return {*}
   */
  async getItemList(query: IQuery = {}): Promise<any> {
    const { pageSize = 100, page = 1 } = query;

    let skip = 0;
    if (page <= 1) {
      skip == 0;
    } else {
      skip = page - 1;
    }

    const data = await this.proitemModel
      .find()
      .where()
      .limit(pageSize)
      .sort({ create_times: -1 })
      .skip(skip * pageSize)
      .exec();

    return data;
  }
}
