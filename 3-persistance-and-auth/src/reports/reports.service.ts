import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const createdReport = this.repo.create(reportDto);
    // Report user is an User instance, so the user argument will fullfil that relationship
    createdReport.user = user;
    return this.repo.save(createdReport);
  }

  async changeApprovalState(id: string, approvalState: boolean) {
    const foundedReport = await this.repo.findOne({ where: { id: +id } });

    if (foundedReport === null) {
      throw new NotFoundException();
    }

    foundedReport.approved = approvalState;

    return this.repo.save(foundedReport);
  }
}
