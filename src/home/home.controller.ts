import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { HomeSerivce } from './home.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IQuery } from './../utils/query.decorator';

import { CreatePostDto, UpdatePostDto } from './home.dto';

@Controller('home')
@ApiTags('首页')
export class HomeController {
  constructor(private readonly homeSerivce: HomeSerivce) {}
  @Post('create')
  @ApiOperation({ summary: '创建首页文章' })
  async create(@Body() createPost: CreatePostDto): Promise<any> {
    return this.homeSerivce.createPage(createPost);
  }
  @Post('list')
  @ApiOperation({ summary: '获取首页文章列表' })
  async getList(@Body() getDetailBody: IQuery = {}): Promise<any> {
    return this.homeSerivce.getArtList(getDetailBody);
  }
  @Get('detail')
  @ApiOperation({ summary: '文章详情' })
  detail(@Query('id') id: string) {
    return this.homeSerivce.getOneDetail(id);
  }

  @Put('update')
  @ApiOperation({ summary: '编辑文章' })
  update(@Body() updateBody: UpdatePostDto) {
    return this.homeSerivce.updateArtlist(updateBody._id, updateBody);
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除文章' })
  remove(@Query('id') id: string) {
    return this.homeSerivce.removeArtlist(id);
  }
}
