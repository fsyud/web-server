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

import { CreatePostDto, UpdatePostDto } from './home.dto';

@Controller('home')
@ApiTags('首页')
export class HomeController {
  constructor(private readonly homeSerivce: HomeSerivce) {}
  @Put('create')
  @ApiOperation({ summary: '创建首页文章' })
  async create(@Body() createPost: CreatePostDto): Promise<any> {
    return this.homeSerivce.createPage(createPost);
  }
  @Get('list')
  @ApiOperation({ summary: '获取首页文章列表' })
  async getList(): Promise<any> {
    return this.homeSerivce.getPageList();
  }
  @Get('detail')
  @ApiOperation({ summary: '文章详情' })
  detail(@Query('id') id: string) {
    return this.homeSerivce.getOneDetail(id);
  }

  @Post('update')
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
