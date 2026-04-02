import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';

@Serialize(ReportDto)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  /**
   * The guard has added to block access to any client that has not been logged before
   * The, the CurrentUser decorator will serve the user data to the controller and will
   * be passed to the service to integrate the entity and be saved after.
   */
  @Post('create')
  @UseGuards(AuthGuard)
  createReport(@Body() reportBody: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(reportBody, user);
  }
}
