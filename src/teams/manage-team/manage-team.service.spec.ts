import { Test, TestingModule } from '@nestjs/testing';
import { ManageTeamService } from './manage-team.service';

describe('ManageTeamService', () => {
  let service: ManageTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageTeamService],
    }).compile();

    service = module.get<ManageTeamService>(ManageTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
