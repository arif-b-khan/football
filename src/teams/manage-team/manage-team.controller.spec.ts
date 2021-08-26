import { Test, TestingModule } from '@nestjs/testing';
import { ManageTeamController } from './manage-team.controller';

describe('ManageTeamController', () => {
  let controller: ManageTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageTeamController],
    }).compile();

    controller = module.get<ManageTeamController>(ManageTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
