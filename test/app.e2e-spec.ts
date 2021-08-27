import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const server = app.getHttpServer();
    return request(server).get('/health').expect(200).expect('healthy');
  });

  it('/ (GET) api team', () => {
    return request(app.getHttpServer())
      .get('/team')
      .expect(200)
      .expect('This action returns all team');
  });
});
