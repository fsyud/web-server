import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '文章创建标题' })
  @IsNotEmpty({ message: '请填写文章标题' })
  title: string;
  @ApiProperty({ description: '文章创建内容' })
  content: string;
}

export class UpdatePostDto {
  _id: string | number;
  title: string;
  content: string;
}
