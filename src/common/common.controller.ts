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
    file.path =
      'https://file.starryskystar.space/images/' +
      file.path.replace('../fileUpload/', '');
    return file;
  }
}
