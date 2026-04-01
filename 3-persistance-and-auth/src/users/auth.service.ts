import { promisify } from 'node:util';
import { randomBytes, scrypt } from 'node:crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

const scriptInPromise = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const userExists = await this.usersService.findAll(email);

    if (userExists.length > 0) {
      // In case a user exists, throw a NestJS exception with a message
      throw new BadRequestException('User already exists');
    }

    // Generate a salt from 8 random 0s and 1s and convert it to a hexadecimal string
    const salt = randomBytes(8).toString('hex');
    // Generate a string with the password, the salt and 32 for string length
    const hash = (await scriptInPromise(password, salt, 32)) as Buffer;
    // Join the salt and the hash (converted from a buffer to a hexadecimal string)
    const result = `${salt}.${hash.toString('hex')}`;

    return await this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findAll(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Knowing the hashed password is joined by a dot, we first split it from there
    const [salt, storedHash] = user.password.split('.');
    /**
     * Then, we get the hash from the hashed password and its salt because this
     * combination will return the same final hash due its structure
     */
    const hash = (await scriptInPromise(password, salt, 32)) as Buffer;

    /**
     * If the stored hash is different from the original one (becuase its structure is
     * different, therefore its result it will also be), then the provided password is
     * a wrong one
     */
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
