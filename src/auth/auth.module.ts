import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './auth.controller';
import { Auth, LoginSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SECRET } from './secret';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: LoginSchema }]),
    // 引入 Jwt 模块并配置秘钥和有效时长
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '1000000h' },
    }),
  ],
  controllers: [LoginController],
  // 引入JwtStrategy
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
