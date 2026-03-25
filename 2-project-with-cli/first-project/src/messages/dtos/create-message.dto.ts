import { IsString } from 'class-validator';

/**
 * A DTOP (Data Transfer Object) is a specific type of object that transfers data
 * between processes.
 */
export class CreateMessageDto {
  // This decorator is used to handle specific validation rules for a property and return a response body with the error if the validation fails\
  @IsString()
  content: string;
}
