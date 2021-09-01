import { Model } from 'mongoose';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { Home } from './../home/home.schema';
import { Auth } from './../auth/auth.schema';
import {
  CommentPostDto,
  secondCommentDto,
  auditTwoCommentProps,
  removeTwoCommentProps,
} from './comment.dto';

type idTypes = string | number;

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Home.name) private readonly homeModel: Model<Home>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  /**
   * @description: 获取过滤条件评论列表
   * @param {object} getCommit
   * @return {*}
   */
  async getCommentList(getCommit: { article_id: string }): Promise<any> {
    const { article_id } = getCommit;
    const data: any = await this.commentModel
      .aggregate()
      .match({ state: 2, article_id: new mongoose.Types.ObjectId(article_id) })
      .project({
        uid: 1,
        name: 1,
        content: 1,
        likes: 1,
        create_times: 1,
        oneComment: 1,
        article_id: 1,
        secondCommit: {
          $filter: {
            input: '$secondCommit',
            as: 'secondCommit',
            cond: { $eq: ['$$secondCommit.state', 2] },
          },
        },
      })
      .exec();

    return data;
  }

  /**
   * @description: 获取所有评论
   * @return {*}
   */
  async getAllCommentList(query: {
    pageSize?: number;
    page?: number;
  }): Promise<any> {
    const { pageSize = 15, page = 1 } = query;

    let skip = 0;
    if (page <= 1) {
      skip == 0;
    } else {
      skip = page - 1;
    }

    const data: any = await this.commentModel
      .find()
      .where()
      .limit(pageSize)
      .sort({ create_times: -1 })
      .skip(skip * pageSize)
      .exec();
    return data;
  }

  /**
   * @description: 创建一级评论
   * @param {CommentPostDto} commentPost
   * @return {*}
   */
  async addOneComment(commentPost: CommentPostDto): Promise<any> {
    const { article_id, user_id } = commentPost;
    const midCreate: any = {
      ...commentPost,
      ...{
        create_times: moment().format(),
      },
      ...{ state: 1 },
    };

    const data = await this.homeModel.findById(article_id);

    if (data) {
      const userInfo = await this.authModel.findById(user_id);
      const { username, avatar_url, _id, type = 1 } = userInfo;
      midCreate.oneComment = {
        user_id: _id,
        user_name: username,
        type,
        avatar: avatar_url,
      };

      midCreate.article_title = data.title;

      await new this.commentModel(midCreate).save();
    }

    return {
      msg: '评论成功，博主审核中...',
      success: true,
    };
  }

  /**
   * @description: 删除一级评论
   * @param {idTypes} id
   * @return {*}
   */
  async removeOneComment(id: idTypes): Promise<any> {
    const commentInfo = await this.commentModel.findById(id);

    const data = await this.homeModel.findById(commentInfo.article_id);

    await this.commentModel.findByIdAndDelete(id);

    await this.homeModel.findByIdAndUpdate(commentInfo.article_id, {
      meta: {
        comments: data.meta.comments - 1,
        views: data.meta.views,
        likes: data.meta.likes,
      },
    });

    return {
      msg: '删除成功',
      success: true,
    };
  }

  /**
   * @description: 创建二级评论
   * @param {secondCommentDto} commentPost
   * @return {*}
   */
  async addTwoComment(commentPost: secondCommentDto): Promise<any> {
    const { article_id, reply_content, reply_to_user_id, user_id, commit_id } =
      commentPost;

    const data: any = await this.homeModel.findById(article_id);

    let obj: any = {};

    if (!data) {
      return {
        msg: '该文章已删除！',
        success: true,
      };
    }

    const commentInfo = await this.commentModel.findById(commit_id);

    if (!commentInfo) {
      return {
        msg: '该评论已删除！',
        success: true,
      };
    }

    const userInfo = await this.authModel.findById(user_id);

    obj.user = {
      user_id,
      user_name: userInfo.username,
      type: userInfo.type,
      avatar: userInfo.avatar_url,
    };

    const toUserInfo = await this.authModel.findById(reply_to_user_id);

    obj.to_user = {
      user_id: reply_to_user_id,
      user_name: toUserInfo.username,
      type: userInfo.type,
      avatar: toUserInfo.avatar_url,
    };

    obj = {
      ...obj,
      ...{ reply_content, state: 1, create_times: moment().format() },
    };

    commentInfo.secondCommit.push(obj);

    await this.commentModel.findByIdAndUpdate(commit_id, commentInfo);

    return {
      msg: '评论成功，博主审核中...',
      success: true,
    };
  }

  /**
   * @description: 一级评论审核
   * @param {*}
   * @return {*}
   */
  async auditOneComment(auditBody: {
    id: string;
    article_id: string;
  }): Promise<any> {
    const { id, article_id } = auditBody;

    const data: any = await this.homeModel.findById(article_id);

    await this.commentModel.findByIdAndUpdate(id, {
      state: 2,
    });

    await this.homeModel.findByIdAndUpdate(article_id, {
      meta: {
        comments: data.meta.comments + 1,
        views: data.meta.views,
        likes: data.meta.likes,
      },
    });

    return {
      msg: '审核成功',
      success: true,
    };
  }

  /**
   * @description: 二级评论审核
   * @param {*}
   * @return {*}
   */
  async auditTwoComment(auditBody: auditTwoCommentProps): Promise<any> {
    const { curId, article_id } = auditBody;
    const data: any = await this.homeModel.findById(article_id);

    await this.commentModel.updateOne(
      { 'secondCommit._id': curId },
      {
        $set: {
          'secondCommit.$.state': 2,
        },
      },
    );

    await this.homeModel.findByIdAndUpdate(article_id, {
      meta: {
        comments: data.meta.comments + 1,
        views: data.meta.views,
        likes: data.meta.likes,
      },
    });

    return {
      msg: '审核成功',
      success: true,
    };
  }

  /**
   * @description: 删除二级评论
   * @param {idTypes} id
   * @return {*}
   */
  async removeTwoComment(twoAuditPost: removeTwoCommentProps): Promise<any> {
    const { commmnetId, curId, state } = twoAuditPost;

    const commentInfo = await this.commentModel.findById(commmnetId);

    const data = await this.homeModel.findById(commentInfo.article_id);

    // 删除数组中符合条件的元素
    await this.commentModel.updateOne(
      { _id: commmnetId },
      {
        $pull: { secondCommit: { _id: curId } },
      },
    );

    if (state === 2) {
      await this.homeModel.findByIdAndUpdate(commentInfo.article_id, {
        meta: {
          comments: data.meta.comments - 1,
          views: data.meta.views,
          likes: data.meta.likes,
        },
      });
    }

    return {
      msg: '删除成功',
      success: true,
    };
  }
}
