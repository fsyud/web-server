import { Controller, Post, Body } from '@nestjs/common';
import { AwhileService } from './awhile.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { awhilePostDto, secondawhileDto } from './awhile.dto';

@Controller('awhile')
@ApiTags('时刻')
export class AwhileController {
  constructor(private readonly awhileService: AwhileService) {}

  @Post('list')
  @ApiOperation({ summary: '获取时刻列表' })
  async getList(@Body() getAwhile: { tag?: number }): Promise<any> {
    return this.awhileService.getAwhileList(getAwhile);
  }

  @Post('addOne')
  @ApiOperation({ summary: '添加一级时刻' })
  async addOne(@Body() awhilePost: awhilePostDto): Promise<any> {
    return this.awhileService.addOneAwhile(awhilePost);
  }

  @Post('addTwo')
  @ApiOperation({ summary: '添加二级时刻' })
  async addTwo(@Body() awhilePost: secondawhileDto): Promise<any> {
    console.log(awhilePost);
    return this.awhileService.addTwoAwhile(awhilePost);
  }
}
