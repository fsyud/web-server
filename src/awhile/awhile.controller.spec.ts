import { Test, TestingModule } from '@nestjs/testing';
import { AwhileController } from './awhile.controller';

describe('AwhileController', () => {
  let controller: AwhileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwhileController],
    }).compile();

    controller = module.get<AwhileController>(AwhileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
