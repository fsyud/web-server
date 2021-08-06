import { Controller, Post, Body, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { loginParams } from './auth.dto';
import { IQuery } from './../utils/query.decorator';

@Controller('login')
@ApiTags('登录/注册')
export class LoginController {
  constructor(private readonly loginService: AuthService) {}
  @Post('user_login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginParam: loginParams): Promise<any> {
    console.log(loginParam);
    return this.loginService.login(loginParam);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerParam: loginParams): Promise<any> {
    return this.loginService.register(registerParam);
  }

  @Post('list')
  @ApiOperation({ summary: '获取用户列表' })
  async getList(@Body() getDetailBody: IQuery = {}): Promise<any> {
    return this.loginService.getArtList(getDetailBody);
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除用户' })
  remove(@Query('id') id: string) {
    return this.loginService.removeArtlist(id);
  }
}
