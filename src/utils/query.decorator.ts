import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryOptions } from 'mongoose';
import { Request } from 'express';

export interface IQuery {
  where?: any;
  pageSize?: number;
  page?: number;
  skip?: number;
  sort?: any;
  populate?: string | any;
  select?: string | any;
  collation?: QueryOptions['collation'];
}

export const CrudQuery = createParamDecorator(
  (name = 'query', ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    try {
      return JSON.parse(String(req.query[name] || ''));
    } catch (e) {
      return {};
    }
  },
);
