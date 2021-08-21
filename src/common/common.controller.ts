import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('common')
@ApiTags('文件上传')
export class CommonController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const a = '/Volumes/workspace/github/blog-server/';
    const b = '/private/blog-server/';

    file.path = b + file.path;

    return file;
  }
}
