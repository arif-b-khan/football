import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamModel } from 'src/models/team-model';

@Controller('manage-team')
export class ManageTeamController {
  @Get()
  public getTeams() {
    const testTeam = {
      name: 'Arsenal',
      img: 'http://img.com',
    };
    return JSON.stringify(testTeam);
  }

  @Post()
  public setTeam(@Body() teamModel: TeamModel): TeamModel {
    console.log(JSON.stringify(teamModel));
    return 
  }
}
