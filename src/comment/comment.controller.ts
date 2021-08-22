import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentPostDto } from './comment.dto';

@Controller('comment')
@ApiTags('评论')
export class CommentController {
  constructor(private readonly commentSerivce: CommentService) {}

  @Post('list')
  @ApiOperation({ summary: '获取评论列表' })
  async getList(@Body() getCommit: { article_id: string }): Promise<any> {
    return this.commentSerivce.getCommentList(getCommit);
  }

  @Post('addOne')
  @ApiOperation({ summary: '添加一级评论' })
  async addOne(@Body() commentPost: CommentPostDto): Promise<any> {
    return this.commentSerivce.addOneComment(commentPost);
  }

  @Post('addTwo')
  @ApiOperation({ summary: '添加二级评论' })
  async addTwo(@Body() commentPost: CommentPostDto): Promise<any> {
    return this.commentSerivce.addTwoComment(commentPost);
  }
}
