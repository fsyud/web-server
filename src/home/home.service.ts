import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    console.log(createPost);
    await new this.homeModel(createPost).save();
    return {
      msg: '发布成功',
      success: true,
    };
  }

  async getArtList(query: IQuery = {}): Promise<any[]> {
    const data = await this.homeModel.find().exec();
    return data;
  }

  async getOneDetail(id: idTypes): Promise<any> {
    return await this.homeModel.findById(id);
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
      success: true,
    };
  }
}
