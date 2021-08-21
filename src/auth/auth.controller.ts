import { Controller, Post, Body, Delete, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { userParams } from './auth.dto';
import { IQuery } from './../utils/query.decorator';

@Controller('login')
@ApiTags('登录/注册')
export class LoginController {
  constructor(private readonly loginService: AuthService) {}
  @Post('user_login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginParam: userParams): Promise<any> {
    console.log(loginParam);
    return this.loginService.login(loginParam);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerParam: userParams): Promise<any> {
    return this.loginService.register(registerParam);
  }

  @Post('list')
  @ApiOperation({ summary: '获取用户列表' })
  async getList(@Body() getDetailBody: IQuery = {}): Promise<any> {
    return this.loginService.getUserList(getDetailBody);
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除用户' })
  remove(@Query('id') id: string) {
    return this.loginService.removeUserlist(id);
  }

  @Post('update_userinfo')
  @ApiOperation({ summary: '修改用户信息' })
  update(@Body() updateBody: userParams) {
    return this.loginService.updateUserInfo(updateBody);
  }

  @Get('userinfo')
  @ApiOperation({ summary: '获取用户信息' })
  async getUser(@Query('id') id: string) {
    return this.loginService.getOneUserInfo(id);
  }
}
