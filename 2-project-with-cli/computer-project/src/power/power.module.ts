import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

/**
 * The PowerService is the first part of the logic that will be injected into
 * different modules/services, so it starts to exporting its service to be used in other modules.
 * That's why besides being a provider, it also needs to be exported.
 */
@Module({
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}
