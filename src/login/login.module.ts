import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './login.controller';
import { Login, LoginSchema } from './login.schema';
import { LoginService } from './login.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }]),
    JwtModule.register({
      secret: 'dy@naze~#&&',
      signOptions: { expiresIn: '60s' },
    }),
    // 引入并配置PassportModule
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [LoginController],
  // 引入JwtStrategy
  providers: [LoginService, JwtStrategy],
})
export class LoginModule {}
