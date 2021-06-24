import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('awhile')
@ApiTags('片刻')
export class AwhileController {
  @Get()
  index() {
    return [{ a: 1 }, { a: 1 }, { a: 2 }];
  }
}
