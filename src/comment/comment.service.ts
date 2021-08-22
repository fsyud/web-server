import { Model } from 'mongoose';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { Home } from './../home/home.schema';
import { Auth } from './../auth/auth.schema';
import { CommentPostDto, secondCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
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
    const { article_id, user_id } = commentPost;
    const midCreate: any = {
      ...commentPost,
      ...{
        create_times: moment().format(),
      },
    };

    const data = await this.homeModel.findById(article_id);

    if (data) {
      const userInfo = await this.authModel.findById(user_id);
      const { username, avator_url, _id, type = 1 } = userInfo;
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

  async addTwoComment(commentPost: secondCommentDto): Promise<any> {
    const { article_id, reply_content, reply_to_user_id, user_id } =
      commentPost;

    const data = await this.homeModel.findById(article_id);

    let obj: any = {};

    if (data) {
      const userInfo = await this.authModel.findById(user_id);

      obj.user = {
        user_id,
        user_name: userInfo.username,
        type: 2,
        avatar: userInfo.avator_url,
      };

      const toUserInfo = await this.authModel.findById(reply_to_user_id);

      obj.to_user = {
        user_id: reply_to_user_id,
        user_name: toUserInfo.username,
        type: 2,
        avatar: toUserInfo.avator_url,
      };

      obj = {
        ...obj,
        ...{ reply_content, state: 0, create_times: moment().format() },
      };

      // const commentSave = await new this.commentModel({
      //   secondCommit: obj,
      // }).save();

      // if (commentSave) {
      //   await this.homeModel.findByIdAndUpdate(article_id, {
      //     meta: {
      //       comments: data.meta.comments + 1,
      //       views: data.meta.views,
      //       likes: data.meta.likes,
      //     },
      //   });
      // }
    }

    return {
      msg: '评论成功',
      success: true,
    };
  }
}
