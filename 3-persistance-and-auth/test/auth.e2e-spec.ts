import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import cookieSession from 'cookie-session';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieSession({ keys: ['testSessionKey'] }));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'testtest',
      })
      .expect(201)
      .then((response) => {
        const body = response.body as { id: number; email: string };
        expect(body.id).toBeDefined();
        expect(body.email).toBeDefined();
        expect(body.email).toBe('test@test.com');
      });
  });
});
