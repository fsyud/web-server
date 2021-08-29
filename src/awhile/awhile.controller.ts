import { Controller, Post, Body } from '@nestjs/common';
import { AwhileService } from './awhile.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { awhilePostDto } from './awhile.dto';

@Controller('awhile')
@ApiTags('时刻')
export class AwhileController {
  constructor(private readonly awhileService: AwhileService) {}

  @Post('list')
  @ApiOperation({ summary: '获取时刻列表' })
  async getList(@Body() getBoard: { tag?: number }): Promise<any> {
    return this.awhileService.getAwhileList(getBoard);
  }

  @Post('addOne')
  @ApiOperation({ summary: '添加一级时刻' })
  async addOne(@Body() boardPost: awhilePostDto): Promise<any> {
    return this.awhileService.addOneAwhile(boardPost);
  }
}
