import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  findAll() {
    return `This action returns all reports`;
  }

  searchContains(searchString: string) {
    return `This action returns reports containing '${searchString}' in their content`;
  }

  findByDateRange(startDate: string, endDate: string) {
    return `This action returns the list of reports created between ${startDate} and ${endDate}`;
  }
}
