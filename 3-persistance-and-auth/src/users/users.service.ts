import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Repository<User> means that this repo will use only typeorm User entity
     * @InjectRepository(User) means it will help the dependency injection work in
     * this scenario because we are using a generic (<GenericClassName>)
     */
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  create(email: string, password: string) {
    /**
     * Now, you can see the repository with its methods does the database work
     * The service works as a layer to handle the data, do some busineess logic if
     * needed, and then use the repository to do the database work.
     */
    const createdUser = this.repo.create({ email, password });
    return this.repo.save(createdUser);
  }

  async findOne(id: number) {
    /**
     * This line is for a case you are looking for a user with an empty session cookie
     * which value is null, therefore, if the id is null due the empty cookie, the
     * service will return null (an empty response) or an error (depending on what
     * you want to indicate to the user)
     */
    if (!id) {
      return null;
    }
    /**
     * The idea of this logic if first to find the user
     * Then, if is not found, trow a NestJS exception
     * If is found, return the user
     */
    const findedUser = await this.repo.findOneBy({ id });

    if (!findedUser) {
      throw new NotFoundException();
    }

    return findedUser;
  }

  findAll(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const findedUser = await this.repo.findOneBy({ id });

    if (!findedUser) {
      throw new NotFoundException();
    }

    /**
     * The logic of update and save is that create and update execute the database
     * action, but is not logging any changes, but the save method will trigger logging
     * to the TypeORM listeners that the dev has activated on the entity side
     * Algthouht we can execute the logging on the service side, is a good practice to
     * keep the database-related events on the entity/database layer for better
     * separation of concerns
     */
    await this.repo.update(findedUser.id, attrs);
    return this.repo.save(findedUser);
  }

  async remove(id: number) {
    const findedUser = await this.repo.findOneBy({ id });

    if (!findedUser) {
      throw new NotFoundException();
    }

    /**
     * Remove works the same as the delete function in TypeORM, but it will trigger the
     * events on the database layer, while the delete function will not trigger it
     */
    return this.repo.remove(findedUser);
  }
}
