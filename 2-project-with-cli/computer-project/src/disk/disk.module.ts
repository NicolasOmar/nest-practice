import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from 'src/power/power.module';

/**
 * To use the PowerService into the DiskService, we need to import the PowerModule into this module
 * and then we can inject the PowerService into the DiskService.
 */
@Module({
  imports: [PowerModule],
  providers: [DiskService],
  exports: [DiskService],
})
export class DiskModule {}
