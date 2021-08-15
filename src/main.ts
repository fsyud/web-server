import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 接口限制
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Nextjs博客Api')
    .setDescription('The blog API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
}
bootstrap();
