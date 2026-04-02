import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  mileage: number;

  /**
   * The first argument of the relationship is refering the invocation of a entity class
   * encapsulated into a function to be called once the relationship is invoked
   * (if we want to call the same entity, we might get an undefined as response due the
   * class has not beign loaded to be called at execution time, and to solve that, is
   * better to invoke it in an isolated function when is needed)
   */
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
