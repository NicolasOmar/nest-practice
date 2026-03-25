import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

/**
 * The only entry point we want to display to the public will be through the ComputerController
 * Therefore, this is the only controller in the project that will use different
 * services to call their methods and return the result of those methods to the user.
 */
@Controller('computer')
export class ComputerController {
  constructor(
    public cpuService: CpuService,
    public diskService: DiskService,
  ) {}

  @Get()
  run(): string[] {
    const cpuResult = this.cpuService.compute(5, 10);
    const diskResult = this.diskService.getData();

    return [cpuResult, diskResult];
  }
}
