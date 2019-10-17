import { Test, TestingModule } from '@nestjs/testing';
import { UserAccesoService } from './user-acceso.service';

describe('UserAccesoService', () => {
  let service: UserAccesoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAccesoService],
    }).compile();

    service = module.get<UserAccesoService>(UserAccesoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
