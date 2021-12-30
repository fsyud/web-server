import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Home } from './home.schema';
import { Auth } from './../auth/auth.schema';
import { Comment } from './../comment/comment.schema';
import { CreatePostDto, UpdatePostDto, LikesPostDto } from './home.dto';

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
    const user: any = await this.authModel.findById(createPost.user_id);

    // state 1 草稿 2 未审核 3 已审核
    const midCreate: any = {
      ...{
        create_times: moment().format(),
        state: user?.type == 1 ? 3 : 2,
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

    midCreate.author_user_info = user || {};
    await new this.homeModel(midCreate).save();

    if (user?.type === 1) {
      return {
        msg: '发布成功，博主审核中...',
        success: true,
      };
    }

    return {
      msg: '发布成功,',
      success: true,
    };
  }

  /**
   * @description: 得到文章列表
   * @param {IQuery} query
   * @return {*}
   */
  async getArtList(query: IQuery = {}): Promise<any[]> {
    const {
      pageSize = 10,
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

  /**
   * @description: 文章详情
   * @param {idTypes} id
   * @return {*}
   */
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

  /**
   * @description: 文章更新
   * @param {idTypes} id
   * @param {UpdatePostDto} updataContent
   * @return {*}
   */
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

  /**
   * @description: 删除文章
   * @param {idTypes} id
   * @return {*}
   */
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

  /**
   * @description: 热点数据
   * @param {*}
   * @return {*}
   */
  async hotArticle(): Promise<any> {
    const find = await this.homeModel
      .find()
      .limit(4)
      .select('title')
      .sort({ views: 1 })
      .exec();
    return find;
  }

  async pigeonholeList(): Promise<any> {
    const find = await this.homeModel
      .find()
      .select('title create_times')
      .sort({ create_times: -1 })
      .exec();
    return find;
  }

  /**
   * @description: 更新评论数字
   * @param {object} query
   * @return {*}
   */
  async updateCommentNum(query: { id: string; num: number }): Promise<any> {
    await this.homeModel.findByIdAndUpdate(query.id, {
      'meta.comments': query.num,
    });

    return {
      msg: '更新成功成功',
      success: true,
    };
  }

  async likeActions(query: LikesPostDto): Promise<any> {
    const { user_id, article_id } = query;

    const article_data = await this.homeModel.findById(article_id);

    const curLikes = article_data.meta.likes;

    if (curLikes.includes(user_id)) {
      return {
        msg: '已经点赞了！',
        success: true,
      };
    } else {
      await this.homeModel.findByIdAndUpdate(article_id, {
        meta: {
          comments: article_data.meta.comments,
          views: article_data.meta.views,
          likes: [...[user_id], ...curLikes],
        },
      });

      return {
        msg: '点赞成功！',
        success: true,
      };
    }
  }
}
