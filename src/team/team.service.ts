import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const teamExists: Team[] = await this.findByName(createTeamDto.name);
    console.log(teamExists);

    if (teamExists && teamExists.length === 0) {
      try {
        const created: Team = await this.teamModel.create({
          name: createTeamDto.name,
          img: createTeamDto.img,
        });
        // created.save();
        return created;
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    } else {
      throw new BadRequestException('Team already exists');
    }
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
