import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('UsersController', () => {
  const fakeUser = { id: 10, email: 'test@test.com', password: 'testtest' };
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({ ...fakeUser, id });
      },
      findAll: (email: string) => {
        return Promise.resolve([{ ...fakeUser, email }]);
      },
      remove: (id: number) => {
        return Promise.resolve({ ...fakeUser, id });
      },
      update: (id: number) => {
        return Promise.resolve({ ...fakeUser, id });
      },
    };
    fakeAuthService = {
      signin: (email, password) => {
        return Promise.resolve({ ...fakeUser, email, password });
      },
      signup: (email, password) => {
        return Promise.resolve({ ...fakeUser, email, password });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
