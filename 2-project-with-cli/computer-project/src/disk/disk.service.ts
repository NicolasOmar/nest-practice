import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

/**
 * To call the PowerService from the DiskService, we need to inject it into the constructor of the DiskService
 * as it has been teached on the 'first-project' exercise.
 */
@Injectable()
export class DiskService {
  constructor(public powerService: PowerService) {}

  getData(): string {
    const powerUsage = 50; // Example power usage for reading data
    this.powerService.supplyPower(powerUsage);
    return 'Getting data from disk';
  }
}
