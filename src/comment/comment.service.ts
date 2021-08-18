import { Model } from 'mongoose';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { CommentPostDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getCommentList(): Promise<any> {
    const data = await this.commentModel.find().exec();
    return data;
  }

  async addOneComment(commentPost: CommentPostDto): Promise<any> {
    const midCreate = {
      ...commentPost,
      ...{
        create_times: moment().format(),
      },
    };

    await new this.commentModel(midCreate).save();
    return {
      msg: '评论成功',
      success: true,
    };
  }
}
