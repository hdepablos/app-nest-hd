import { Test, TestingModule } from '@nestjs/testing';
import { UserAccesoController } from './user-acceso.controller';

describe('UserAcceso Controller', () => {
  let controller: UserAccesoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAccesoController],
    }).compile();

    controller = module.get<UserAccesoController>(UserAccesoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
