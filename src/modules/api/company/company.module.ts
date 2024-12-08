import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../../models/user/user.model';
import { CompanyModelDefinition } from '../../../models/company/company.model';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
@Module({
  imports: [
    MongooseModule.forFeature([UserModelDefinition, CompanyModelDefinition]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
