import { Module } from '@nestjs/common';
import { ManageTeamController } from './manage-team/manage-team.controller';
import { ManageTeamService } from './manage-team/manage-team.service';

@Module({
  controllers: [ManageTeamController],
  providers: [ManageTeamService]
})
export class TeamsModule {}
