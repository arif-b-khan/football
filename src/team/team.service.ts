import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  /**
   *
   */
  constructor(
    @InjectModel(Team)
    private teamModel: typeof Team,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const created: Team = await Team.create({
      name: createTeamDto.name,
      img: createTeamDto.img,
    });
    created.save();
    return created;
  }

  async findAll(): Promise<Team[]> {
    return await this.teamModel.findAll();
  }

  async findOne(id: number): Promise<Team> {
    return await this.teamModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<Team[]> {
    return await this.teamModel.findAll({
      where: {
        name,
      },
    });
  }

  async update(
    id: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<[number, Team[]]> {
    const team: Team = await this.findOne(id);
    if (team === null) {
      throw new NotFoundException(`Team id: ${id} not found`);
    }
    return this.teamModel.update(updateTeamDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const team: Team = await this.findOne(id);
    if (team === null) {
      throw new NotFoundException(`Team id: ${id} not found`);
    }
    await team.destroy();
  }
}
