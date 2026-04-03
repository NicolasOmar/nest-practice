import { Report } from 'src/reports/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: false })
  isAdmin: boolean;

  /**
   * The first argument of the relationship is refering the invocation of a entity class
   * encapsulated into a function to be called once the relationship is invoked
   * (if we want to call the same entity, we might get an undefined as response due the
   * class has not beign loaded to be called at execution time, and to solve that, is
   * better to invoke it in an isolated function when is needed)
   */
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
