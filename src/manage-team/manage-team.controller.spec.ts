import { Test, TestingModule } from '@nestjs/testing';
import { ManageTeamController } from './manage-team.controller';
import { ManageTeamService } from './manage-team.service';

describe('ManageTeamController', () => {
  let controller: ManageTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageTeamController],
      providers: [ManageTeamService],
    }).compile();

    controller = module.get<ManageTeamController>(ManageTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
