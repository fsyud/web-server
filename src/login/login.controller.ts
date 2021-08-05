import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { loginParams } from './login.dto';

@Controller('login')
@ApiTags('登录/注册')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('user_login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginParam: loginParams): Promise<any> {
    return this.loginService.login(loginParam);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() registerParam: loginParams): Promise<any> {
    console.log(registerParam);
    return this.loginService.register(registerParam);
  }
}
