import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Match } from '../../../../components/decorator/match.decorator';

export class SignUpDto {
  @ApiProperty({
    example: 'Atest@example.com',
    description: 'Email OF User',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Repeat same value as in password field',
    example: 'Pass#123',
  })
  @Match('password')
  @IsNotEmpty()
  readonly passwordConfirm: string;

  @ApiProperty({
    description: 'firstname OF User',
    example: 'Afshin',
  })
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;
  @ApiProperty({
    description: 'lastname OF User',
    example: 'Rahmati',
  })
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;
  @ApiProperty({
    description: 'phoneNumber OF User',
    example: '09108348429',
  })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;
  @ApiProperty({
    description: 'nationalCode OF User',
    example: '0023415649',
  })
  @IsNotEmpty()
  @IsString()
  readonly nationalCode: string;
}
