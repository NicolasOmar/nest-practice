import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { CpuModule } from 'src/cpu/cpu.module';
import { DiskModule } from 'src/disk/disk.module';

/**
 * The idea in this exercise is to inject more than one service into this controller to call from this
 * ComputerController the methods of the CpuService and DiskService.
 * The hierarchy of the modules is as follows:
 * - ComputerModule
 *  - CpuModule
 *    - PowerModule
 *  - DiskModule
 *    - PowerModule
 */
@Module({
  imports: [CpuModule, DiskModule],
  controllers: [ComputerController],
})
export class ComputerModule {}
