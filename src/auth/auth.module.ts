import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './auth.controller';
import { Auth, AuthSchema } from './auth.schema';
import { Home, HomeSchema } from './../home/home.schema';
import { Comment, CommentSchema } from './../comment/comment.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SECRET } from './secret';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: Home.name, schema: HomeSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
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
