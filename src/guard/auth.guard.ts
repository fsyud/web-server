import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log(request.url);

    const whitelist = [
      '/login/user_login',
      '/login/userinfo',
      '/login/register',
      '/home/list',
      '/home/detail',
      '/home/hot',
      '/common/upload',
      '/comment/list',
    ];

    if (whitelist.find((url) => request.url.includes(url))) {
      return true;
    }
    return super.canActivate(context);
  }
}
