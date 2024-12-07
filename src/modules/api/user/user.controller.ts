import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { User } from '../../../components/decorator/user.decorator';
import { UsersService } from './user.service';
import { JwtGuard } from '../../../components/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller({ path: '/api/users' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: 'User' })
  @ApiBearerAuth()
  @Get('showAll')
  async getAll() {
    return this.userService.getAll();
  }
}
