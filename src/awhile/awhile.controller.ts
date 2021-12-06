import { Controller, Post, Body, Delete, Query } from '@nestjs/common';
import { AwhileService } from './awhile.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  awhilePostDto,
  secondawhileDto,
  auditTwoAwhileProps,
} from './awhile.dto';

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
    return this.awhileService.addTwoAwhile(awhilePost);
  }

  // 删除一级时刻
  @Delete('removeOne')
  @ApiOperation({ summary: '删除一级时刻' })
  async removeOne(@Query('id') id: string): Promise<any> {
    return this.awhileService.removeOneAwhile(id);
  }

  @Post('auditOne')
  @ApiOperation({ summary: '审核一级时刻' })
  async auditOne(@Body() auditBody: { id: string }): Promise<any> {
    return this.awhileService.auditOneAwhile(auditBody);
  }

  @Post('auditTwo')
  @ApiOperation({ summary: '审核二级时刻' })
  async auditTwo(@Body() auditBody: auditTwoAwhileProps): Promise<any> {
    return this.awhileService.auditTwoAwhile(auditBody);
  }

  @Post('removeTwo')
  @ApiOperation({ summary: '删除二级时刻' })
  async removeTwo(@Body() twoAuditPost: auditTwoAwhileProps): Promise<any> {
    return this.awhileService.removeTwoComment(twoAuditPost);
  }

  @Post('hot')
  @ApiOperation({ summary: '获取热门时刻' })
  hot() {
    return this.awhileService.hotAwhile();
  }
}
