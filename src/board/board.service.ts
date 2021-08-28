import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from './board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
  ) {}

  async getBoardList(getBoard: { tag: string }): Promise<any> {
    const data: any = await this.boardModel
      .find()
      .where({ tag: getBoard.tag })
      .sort({ create_times: -1 })
      .exec();
    return data;
  }
}
