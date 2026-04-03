import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  longitude: number;

  @Expose()
  latitude: number;

  @Expose()
  mileage: number;

  /**
   *  The userId is a new property that is not registered in
   * the other Report's related dtos or entities, but this
   * will be used to be displayed to cosumers in order to
   * avoid showing too much information
   *  Now, this new property will be shown through a decorator
   * called Transform, that will take the original object's
   * data, and send the information we want to display in
   * particular (having in mind the report object has been
   * associated with a user object/entity)
   */
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
