import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
import * as nuid from 'nuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `/private/blog-server/fileUpload/${dayjs().format(
          'YYYY-MM-DD',
        )}`,
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [CommonController],
})
export class CommonModule {}
