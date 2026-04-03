import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  /**
   *  This particular transform is based in the query call, the value correspond to the
   * year value in the query string (each query param is a value which corresponds with
   * the value you are transforming)
   */
  @Transform(({ value }) => +value)
  year: number;

  @IsLongitude()
  @Transform(({ value }) => +value)
  longitude: number;

  @IsLatitude()
  @Transform(({ value }) => +value)
  latitude: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => +value)
  mileage: number;
}
