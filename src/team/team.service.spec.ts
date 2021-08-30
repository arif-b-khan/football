import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  const teams: Team[] = [
    <Team>{
      id: 1,
      name: 'Test 1',
      img: 'http://img.test',
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
          useValue: {
            findAll: jest.fn((query) => {
              if (query) {
                return teams.filter((t) => t.name === query.where.name);
              } else {
                return teams;
              }
            }),
            findOne: jest.fn((obj) => {
              return teams.find((o) => o.id === obj.where.id);
            }),
          },
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
    expect(result.length).toBe(1);
  });

  it('should return findone by id', async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const result = await service.findOne(1);
    expect(result.id).toBe(1);
  });

  it('findone not finding entity', async () => {
    // jest.spyOn(mockTeam, 'findAll').mockImplementation(() => testPromise);
    const result = await service.findOne(2);
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
    const results = await service.findByName('Test 2');
    expect(results).toBeDefined();
    // expect(results.name).toBe(1);
    expect(results.length).toBe(0);
  });
});
