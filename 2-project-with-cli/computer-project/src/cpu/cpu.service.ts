import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

/**
 * To call the PowerService from the CpuService, we need to inject it into the constructor of the CpuService
 * as it has been teached on the 'first-project' exercise.
 */
@Injectable()
export class CpuService {
  constructor(public powerService: PowerService) {}

  compute(inputA: number, inputB: number): string {
    const totalCompute = (inputA + inputB) * 3;

    this.powerService.supplyPower(totalCompute);

    return `CPU is computing. ${totalCompute} units of data processed.`;
  }
}
