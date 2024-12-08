import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { User } from '../../../components/decorator/user.decorator';
import { UsersService } from './user.service';
import { JwtGuard } from '../../../components/guard/jwt.guard';
import { isMongoId } from 'class-validator';
import { UpdateUserDto } from './dto/user.dto';

@UseGuards(JwtGuard)
@Controller({ path: '/api/users' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: 'User' })
  @ApiBearerAuth()
  @Get('get')
  async getAll() {
    return this.userService.getAll();
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: 'User' })
  @ApiBearerAuth()
  @Get('get/:id')
  async getOne(@Param('id') id: string) {
    if (!isMongoId(id)) {
      throw new BadRequestException();
    }
    return this.userService.getOne(id);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: 'User' })
  @ApiBearerAuth()
  @Get('myAccount')
  async showMe(@User() user: any) {
    return user;
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: 'User' })
  @ApiBearerAuth()
  @Post('update/:id')
  async updateOne(@Param('id') id: string, @Body() body: UpdateUserDto) {
    if (!isMongoId(id)) {
      throw new BadRequestException();
    }
    return this.userService.UpdateOne(id, body);
  }
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: 'User' })
  @ApiBearerAuth()
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    if (!isMongoId(id)) {
      throw new BadRequestException();
    }
    return this.userService.DeleteOne(id);
  }
}
