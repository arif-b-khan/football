import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Team } from './entities/team.entity';
import { IdParam } from '../shared/models/id-param';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Post()
  @HttpCode(200)
  async create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return await this.teamService.create(createTeamDto);
  }

  @ApiOperation({ summary: 'List all the teams' })
  @ApiResponse({ status: 200, description: 'List of teams', type: Team })
  @Get()
  async findAll(): Promise<Team[]> {
    return await this.teamService.findAll();
  }

  @ApiOperation({ summary: 'Find team by id' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Get(':id')
  async findOne(@Param() params: IdParam): Promise<Team> {
    const team: Team = await this.teamService.findOne(+params.id);
    console.log(team);
    if (team === null) {
      throw new NotFoundException('User not found');
    }
    return team;
  }

  @ApiOperation({ summary: 'Find team by name' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Get('byname/:name')
  async findByName(@Param('name') name: string): Promise<Team[]> {
    const teams: Team[] = await this.teamService.findByName(name);
    if (teams === null) {
      throw new NotFoundException('User not found');
    }
    return teams;
  }

  @ApiOperation({ summary: 'Update team' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Patch(':id')
  update(
    @Param() params: IdParam,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<[number, Team[]]> {
    return this.teamService.update(+params.id, updateTeamDto);
  }

  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'Team not found' })
  @Delete(':id')
  async remove(@Param() params: IdParam): Promise<void> {
    return await this.teamService.remove(+params.id);
  }
}
