import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  async createEstimate(query: GetEstimateDto) {
    /**
     *  [createQueryBuilder] is aa Nest solution to the creation of complex queries for
     * search of specific data given a certain mix of params
     *
     *  First, you [select] all the fields of a Report
     *  Then, you select [where], that first one ask for those reports which make
     * property
     * equals one provided by the query object
     *  If we add a second where in this chain, the first one will be overwritten by the
     * last one, so we will use [andWhere]
     *  The point of several [BETWEEN] is to find reports which value is between two
     * values (a range)
     *  The [orderBy] does not need the additional object reference as the where methods
     * once you add them at the end of the logic in the [setParameters] function
     *  The [select] runs a direct SQL query, which in this case looks for an average
     * price from all the queried reports
     */
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('longitude - :longitude BETWEEN -5 AND 5', {
        longitude: query.longitude,
      })
      .andWhere('latitude - :latitude BETWEEN -5 AND 5', {
        latitude: query.latitude,
      })
      .andWhere('year - :year  BETWEEN -3 AND 3', { year: query.year })
      .andWhere('approve IS TRUE')
      .orderBy('mileage = :mileage', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}
