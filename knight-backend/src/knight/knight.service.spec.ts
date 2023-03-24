import { Test, TestingModule } from '@nestjs/testing';
import { KnightService } from './knight.service';

describe('KnightService', () => {
  let service: KnightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnightService],
    }).compile();

    service = module.get<KnightService>(KnightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
