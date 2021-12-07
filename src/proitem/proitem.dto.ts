export class CreatePostDto {
  _id?: string;
  title: string; // 项目标题
  desc: string;
  img_url: string; // 项目封面图片
  links: string; // 项目链接
}

export class IQuery {
  pageSize?: number;
  page?: number;
  skip?: number;
}
