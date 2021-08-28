import { Controller, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('board')
@ApiTags('时刻')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('list')
  @ApiOperation({ summary: '获取时刻列表' })
  async getList(@Body() getBoard: { tag: string }): Promise<any> {
    return this.boardService.getBoardList(getBoard);
  }
}
