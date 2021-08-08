import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    const whitelist = [
      '/login/user_login',
      '/login/register',
      '/home/list',
      '/home/detail',
      '/common/upload',
    ];

    if (whitelist.find((url) => request.url.includes(url))) {
      return true;
    }
    return super.canActivate(context);
  }
}
