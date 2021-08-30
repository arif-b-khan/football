import { BadRequestException } from '@nestjs/common';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  const destroyFn = jest.fn(() => {
    console.log('destroy has been called');
  });

  const updateFn = jest.fn(() => {
    console.log('team has been updated');
  });

  const teamMock: any = {
    findAll: jest.fn((query) => {
      if (query) {
        return teams.filter((t) => t.name === query.where.name);
      } else {
        return teams;
      }
    }),
    findOne: jest.fn((obj) => {
      const team = teams.find((o) => o.id === obj.where.id);
      if (team) {
        return Object.assign(team, {
          destroy: destroyFn,
        });
      }
      return team;
    }),
    save: jest.fn(() => {
      console.log('Saving a team');
    }),
    create: jest.fn((tm: Team) => {
      const crTeam: Team = teams.find((t) => t.name === tm.name);
      if (crTeam) {
        console.log('Team already exists');
        throw new BadRequestException('Team already exists');
      }
      teams.push(tm);
      return teams.find((t) => t.name === tm.name);
    }),
    destroy: jest.fn(() => {
      console.log('Team has been deteled');
    }),
    update: updateFn,
  };
  const teams: Team[] = [
    <Team>{
      id: 1,
      name: 'Test 1',
      img: 'http://img.test',
    },
    <Team>{
      id: 2,
      name: 'Test 2',
      img: 'http://delete.test',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({ storage: 'litedb3', dialect: 'sqlite' }),
        SequelizeModule.forFeature([Team]),
      ],
      providers: [
        TeamService,
        {
          provide: getModelToken(Team),
          useValue: teamMock,
        },
      ],
    }).compile();
    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return findall', async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
  });

  it('should return findone by id', async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const result = await service.findOne(1);
    expect(result.id).toBe(1);
  });

  it('findone not finding entity', async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const result = await service.findOne(3);
    expect(result).toBeUndefined();
  });

  it('should return team by name', async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const results = await service.findByName('Test 1');
    expect(results).toBeDefined();
    // expect(results.name).toBe(1);
    expect(results[0].name).toBe('Test 1');
  });

  it("findByName method doesn't find match", async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const results = await service.findByName('Test @');
    expect(results).toBeDefined();
    // expect(results.name).toBe(1);
    expect(results.length).toBe(0);
  });

  it('create team when not exists', async () => {
    const teamDto: CreateTeamDto = <CreateTeamDto>{
      name: 'testteam',
      img: 'http://test.img',
    };
    const teamResult = await service.create(teamDto);
    expect(teamResult).toBeDefined();
    // expect(results.name).toBe(1);
    expect(teamResult.name).toBe('testteam');
  });

  it('throw bad request when team already exists', async () => {
    const teamDto: CreateTeamDto = <CreateTeamDto>{
      name: 'Test 1',
      img: 'http://test.img',
    };
    try {
      await service.create(teamDto);
    } catch (ex) {
      expect(ex.message).toBe('Team already exists');
    }
  });

  it('Team has been updated', async () => {
    const teamDto: UpdateTeamDto = <UpdateTeamDto>{
      name: 'testteam',
      img: 'http://test.img',
    };
    await service.update(1, teamDto);
    expect(updateFn).toHaveBeenCalledTimes(1);
  });

  it('Remove team when exists', async () => {
    await service.remove(2);
    expect(destroyFn).toHaveBeenCalledTimes(1);
  });
});
