import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  /**
   * In this case, the service will be of type Partial because we want to mock only
   * the part of the service that we use in our AuthService
   */
  let fakeUsersService: Partial<UsersService>;
  /**
   * In order to handle the functions better (and avoid too remaking of faker functions)
   * first we create an empty user list that will be modified inside the faked userService
   * methods, maintaining a cached memory in the time the tests are been executed
   */
  const fakedUserList: User[] = [];

  beforeAll(async () => {
    fakeUsersService = {
      findAll: (email: string) => {
        const filteredUsers = fakedUserList.filter(
          (_user) => _user.email === email,
        );

        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const createdUser = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        };
        fakedUserList.push(createdUser);

        return Promise.resolve(createdUser);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        /**
         * Without this configuration object, the tests will break because the related
         * service calls will not be correctly mocked. To solve this, Nest ask for the
         * service you will want to provide a fake/mocked version and provide the object
         * or value to fake the mentioned service
         */
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const testCreatedUser = await service.signup('test@test.com', 'testtest');
    const [salt, hash] = testCreatedUser.password.split('.');

    expect(testCreatedUser.id).toBeDefined();
    expect(testCreatedUser.email).toBe('test@test.com');
    expect(testCreatedUser.password).not.toEqual('testtest');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  /**
   * This kind of bad/sad path tests work to expect and exception, just have in mind the throw
   * must be called in a specific way according Jest recomendations
   */
  it('throws an error if an user signs up with an already used email', async () => {
    await expect(service.signup('test@test.com', 'testtest')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if user signs in with an unused email', async () => {
    await expect(service.signin('test@gmail.com', 'testtest')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws an error if user provides an invalid password', async () => {
    await expect(service.signin('test@test.com', '$')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns an user if user provides the valid information', async () => {
    await service.signup('test@idea.com', 'testtest');
    // The idea is to handle services directly while maintaining cached data as stated above
    const signedUser = await service.signin('test@idea.com', 'testtest');

    expect(signedUser).toBeDefined();
  });
});
