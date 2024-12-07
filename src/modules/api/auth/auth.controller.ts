import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller({ path: '/api/auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConflictResponse({
    description: 'Conflict: User already exists.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request: Invalid data.',
  })
  @ApiCreatedResponse({
    description: 'Successfully signed up.',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() user: SignInDto,
    @Request() req,
  ): Promise<{ access_token: string } | BadRequestException> {
    return this.authService.login(req.user);
  }
  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign in fields',
  })
  @ApiOkResponse({ description: 'User has been successfully signed in' })
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() singUpDto: SignUpDto): Promise<string> {
    return this.authService.register(singUpDto);
  }
  // @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @ApiOkResponse({ description: 'User has been successfully signed out' })
  // @ApiBearerAuth()
  // @HttpCode(HttpStatus.OK)
  // @Post('sign-out')
  // async singOut(@Param('id') userId: string): Promise<void> {
  //   return this.authService.signOut(userId);
  // }
}
