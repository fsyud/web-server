import { Controller, Body, Post, Delete, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ProitemService } from './proitem.service';

import { CreatePostDto, IQuery } from './proitem.dto';

@Controller('proitem')
export class ProitemController {
  constructor(private readonly proitemService: ProitemService) {}

  @Post('create')
  @ApiOperation({ summary: '创建首页文章' })
  create(@Body() createPost: CreatePostDto): Promise<any> {
    return this.proitemService.createItem(createPost);
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除项目' })
  removeOne(@Query('id') id: string) {
    return this.proitemService.deleteItem(id);
  }

  @Post('updates')
  @ApiOperation({ summary: '更新项目' })
  updateOne(@Body() updateBody: CreatePostDto) {
    return this.proitemService.updateItem(updateBody._id, updateBody);
  }

  @Post('list')
  @ApiOperation({ summary: '获取项目列表' })
  getList(@Body() query: IQuery = {}): Promise<any> {
    return this.proitemService.getItemList(query);
  }
}
