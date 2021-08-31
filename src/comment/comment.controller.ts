import { Controller, Body, Post, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentPostDto, secondCommentDto } from './comment.dto';

@Controller('comment')
@ApiTags('评论')
export class CommentController {
  constructor(private readonly commentSerivce: CommentService) {}

  @Post('list')
  @ApiOperation({ summary: '获取评论列表' })
  async getList(@Body() getCommit: { article_id: string }): Promise<any> {
    return this.commentSerivce.getCommentList(getCommit);
  }

  @Post('allList')
  @ApiOperation({ summary: '获取所有评论列表' })
  async allList(
    @Body() query: { pageSize?: number; page?: number },
  ): Promise<any> {
    return this.commentSerivce.getAllCommentList(query);
  }

  @Post('addOne')
  @ApiOperation({ summary: '添加一级评论' })
  async addOne(@Body() commentPost: CommentPostDto): Promise<any> {
    return this.commentSerivce.addOneComment(commentPost);
  }

  @Delete('removeOne')
  @ApiOperation({ summary: '删除一级评论' })
  removeOne(@Query('id') id: string) {
    return this.commentSerivce.removeOneComment(id);
  }

  @Post('auditOne')
  @ApiOperation({ summary: '审核一级评论' })
  async auditOne(
    @Body() auditBody: { id: string; article_id: string },
  ): Promise<any> {
    return this.commentSerivce.auditOneComment(auditBody);
  }

  @Post('addTwo')
  @ApiOperation({ summary: '添加二级评论' })
  async addTwo(@Body() commentPost: secondCommentDto): Promise<any> {
    return this.commentSerivce.addTwoComment(commentPost);
  }
}
