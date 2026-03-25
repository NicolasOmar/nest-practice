import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number): string {
    return `Supplying ${watts} watts of power`;
  }
}
