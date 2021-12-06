import { Test, TestingModule } from '@nestjs/testing';
import { ProitemService } from './proitem.service';

describe('ProitemService', () => {
  let service: ProitemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProitemService],
    }).compile();

    service = module.get<ProitemService>(ProitemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
