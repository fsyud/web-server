import { Model } from 'mongoose';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { Home } from './../home/home.schema';
import { CommentPostDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
  ) {}

  async getCommentList(getCommit: { article_id: string }): Promise<any> {
    const data = await this.commentModel
      .find()
      .where({ article_id: getCommit.article_id })
      .sort({ create_times: -1 })
      .exec();
    return data;
  }

  async addOneComment(commentPost: CommentPostDto): Promise<any> {
    const { article_id } = commentPost;

    const midCreate: any = {
      ...commentPost,
      ...{
        create_times: moment().format(),
      },
    };

    const data = await this.homeModel.findById(article_id);

    if (data) {
      const {
        author_user_info: { username, avator_url, _id, type = 1 },
      } = data;

      midCreate.oneComment = {
        user_id: _id,
        user_name: username,
        type,
        avatar: avator_url,
      };

      const commentSave = await new this.commentModel(midCreate).save();

      if (commentSave) {
        await this.homeModel.findByIdAndUpdate(article_id, {
          meta: {
            comments: data.meta.comments + 1,
            views: data.meta.views,
            likes: data.meta.likes,
          },
        });
      }
    }

    return {
      msg: '评论成功',
      success: true,
    };
  }

  async addTwoComment(commentPost: CommentPostDto): Promise<any> {
    const { article_id } = commentPost;

    const data = await this.homeModel.findById(article_id);

    const midCreate: any = {
      ...commentPost,
      ...{
        create_times: moment().format(),
      },
    };

    if (data) {
      const {
        author_user_info: { username, avator_url, _id, type = 1 },
      } = data;

      midCreate.oneComment = {
        user_id: _id,
        user_name: username,
        type,
        avatar: avator_url,
      };

      const commentSave = await new this.commentModel(midCreate).save();

      if (commentSave) {
        await this.homeModel.findByIdAndUpdate(article_id, {
          meta: {
            comments: data.meta.comments + 1,
            views: data.meta.views,
            likes: data.meta.likes,
          },
        });
      }
    }

    return {
      msg: '评论成功',
      success: true,
    };
  }
}
