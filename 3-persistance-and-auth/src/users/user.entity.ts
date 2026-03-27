import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * An entity is a combination of a typescript class and a typeorm entity
 * (in this case because we are using typeorm) that will handle the shape of the data in our database
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
