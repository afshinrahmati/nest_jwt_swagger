import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyModel } from '../../../models/company/company.model';
import { CreateCompanyDto } from './dto/company.dto';
import { StatusEnum } from '../../../types/global';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel.name)
    private readonly companyModel: Model<CompanyModel>,
  ) {}

  async create(body: CreateCompanyDto) {
    const company = await this.companyModel.findOne({ code: body.code });
    if (company) {
      throw new BadRequestException('Company with this code found');
    }
    return this.companyModel.create(body);
  }

  getAll() {
    return this.companyModel.find({});
  }
  getOne(id: string) {
    return this.companyModel.findOne({ _id: id });
  }

  deleteOne(id: string) {
    return this.companyModel.findOneAndUpdate(
      { _id: id },
      { status: StatusEnum.DELETED },
    );
  }
}
