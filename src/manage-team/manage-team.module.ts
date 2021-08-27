import { Module } from '@nestjs/common';
import { ManageTeamService } from './manage-team.service';
import { ManageTeamController } from './manage-team.controller';

@Module({
  controllers: [ManageTeamController],
  providers: [ManageTeamService]
})
export class ManageTeamModule {}
