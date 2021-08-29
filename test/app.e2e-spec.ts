import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  var auth = { access_token: null };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const response = await request(app.getHttpServer())
      .post('/accounts/login')
      .send({
        username: 'arif',
        password: 'P@$$w0rd',
      })
      .expect(201);
    auth.access_token = response.body.access_token;
  });

  it('/ (GET)', () => {
    const server = app.getHttpServer();
    return request(server).get('/health').expect(200).expect('healthy');
  });

  it('/ (GET) api teams', async () => {
    const response = await request(app.getHttpServer())
      .get('/team')
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
    const teams = response.body;
    expect(teams).toBeDefined();
    expect(teams.length).toBeGreaterThanOrEqual(1);
  });

  it('/team/id', async () => {
    const response = await request(app.getHttpServer())
      .get('/team/1')
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
    const team = response.body;
    expect(team).toBeDefined();
  });

  it('/team/byname/Arsenal', async () => {
    const response = await request(app.getHttpServer())
      .get('/team/byname/Arsenal')
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
    const team = response.body;
    console.log(team);
    expect(team).toBeDefined();
    expect(team[0].name).toBe('Arsenal');
  });

  it('/ (Post) create team', async () => {
    const response = await request(app.getHttpServer())
      .post('/team')
      .send({
        name: 'TestTeam',
        img: 'http://test.img',
      })
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
    const team = response.body;
    console.log(team);
  });

  it('/ (Patch) team', async () => {
    const response = await request(app.getHttpServer())
      .get('/team/byname/TestTeam')
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
    const team = response.body;
    const id = team[0].id;
    await request(app.getHttpServer())
      .patch(`/team/${id}`)
      .send({
        name: 'TestTeamA',
      })
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
  });

  it('/ get and delete api team', async () => {
    const response = await request(app.getHttpServer())
      .get('/team/byname/TestTeamA')
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
    const team = response.body;
    const id = team[0].id;
    await request(app.getHttpServer())
      .delete(`/team/${id}`)
      .auth(auth.access_token, { type: 'bearer' })
      .expect(200);
  });
});
