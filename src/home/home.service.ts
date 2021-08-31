import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Home } from './home.schema';
import { Auth } from './../auth/auth.schema';
import { Comment } from './../comment/comment.schema';
import { CreatePostDto, UpdatePostDto } from './home.dto';

import { IQuery } from './../utils/query.decorator';

type idTypes = string | number;

@Injectable()
export class HomeSerivce {
  constructor(
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  /**
   * @description: 创建文章
   * @param {CreatePostDto} createPost
   * @return {*}
   */
  async createPage(createPost: CreatePostDto): Promise<any> {
    const midCreate: any = {
      ...{
        create_times: moment().format(),
        state: 2,
      },
      ...createPost,
      ...{
        meta: {
          views: 0,
          likes: 0,
          comments: 0,
        },
      },
    };

    const user = await this.authModel.findById(createPost.user_id);
    midCreate.author_user_info = user || {};
    await new this.homeModel(midCreate).save();

    return {
      msg: '发布成功',
      success: true,
    };
  }

  async getArtList(query: IQuery = {}): Promise<any[]> {
    const {
      pageSize = 15,
      page = 1,
      where = {},
      sort = {},
      filter = {},
    } = query;

    let skip = 0;
    if (page <= 1) {
      skip == 0;
    } else {
      skip = page - 1;
    }

    const data = await this.homeModel
      .find(filter)
      .where({ ...where })
      .limit(pageSize)
      .select(
        'img_url user_id type state tags title keyword author meta create_times update_times desc author_user_info',
      )
      .skip(skip * pageSize)
      .sort(sort)
      .exec();

    return data;
  }

  async getOneDetail(id: idTypes): Promise<any> {
    const find = async () => {
      const data = await this.homeModel.findById(id);

      if (data) {
        await this.homeModel.findByIdAndUpdate(id, {
          meta: {
            comments: data.meta.comments,
            views: data.meta.views + 1,
            likes: data.meta.likes,
          },
        });
        return data;
      }
    };

    return find();
  }

  async updateArtlist(id: idTypes, updataContent: UpdatePostDto): Promise<any> {
    const midCreate: any = {
      ...updataContent,
      ...{
        update_times: moment().format(),
      },
    };
    await this.homeModel.findByIdAndUpdate(id, midCreate);
    return {
      success: true,
    };
  }

  async removeArtlist(id: idTypes): Promise<any> {
    await this.homeModel.findByIdAndDelete(id);

    // 删除关联评论
    await this.commentModel.deleteMany({ article_id: id });

    return {
      msg: '删除成功',
      success: true,
    };
  }

  /**
   * @description: 文章审核
   * @param {idTypes} id
   * @return {*}
   */
  async auditArtlist(auditBody: { id: string }): Promise<any> {
    await this.homeModel.findByIdAndUpdate(auditBody.id, {
      state: 3,
    });

    return {
      msg: '审核成功',
      success: true,
    };
  }

  async hotArticle(): Promise<any> {
    const find = await this.homeModel
      .find()
      .sort({ 'meta.views': -1 })
      .select('title')
      .exec();

    return find;
  }
}
