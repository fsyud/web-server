import { Test, TestingModule } from '@nestjs/testing';
import { ProitemController } from './proitem.controller';

describe('ProitemController', () => {
  let controller: ProitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProitemController],
    }).compile();

    controller = module.get<ProitemController>(ProitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
