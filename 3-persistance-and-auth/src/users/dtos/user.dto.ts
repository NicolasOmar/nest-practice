import { Expose } from 'class-transformer';

// This DTO in particular is beign used to define a structure to deliver specific data to the client
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
