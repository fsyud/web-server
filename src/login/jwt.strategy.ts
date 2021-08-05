import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 配置从头信息里获取token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 忽略过期: false
      ignoreExpiration: false,
      // secret必须与签发jwt的secret一样
      secretOrKey: 'dy@naze~#&&',
    });
  }

  // 实现 validate，在该方法中验证 token 是否合法
  async validate(payload: any) {
    console.log('payload:', payload);
    return payload;
  }
}
