import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

/**
 * To use the PowerService into the CpuService, we need to import the PowerModule into this module
 * and then we can inject the PowerService into the CpuService.
 */
@Module({
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
