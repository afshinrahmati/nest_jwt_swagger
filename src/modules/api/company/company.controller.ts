import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/company.dto';
@ApiTags('Company')
@Controller({ path: '/api/company' })
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({
    description: 'Get logged in company details',
    type: 'Company',
  })
  @ApiBearerAuth()
  @Post('create')
  async create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({
    description: 'Get logged in company details',
    type: 'Company',
  })
  @ApiBearerAuth()
  @Post('get-all')
  async getAll() {
    return this.companyService.getAll();
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({
    description: 'Get logged in company details',
    type: 'Company',
  })
  @ApiBearerAuth()
  @Post('get/:id')
  async getOne(@Param('id') id: string) {
    return this.companyService.getOne(id);
  }
  @ApiBearerAuth()
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    return this.companyService.deleteOne(id);
  }
}
