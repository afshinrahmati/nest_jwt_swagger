import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'Atest@example.com',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({
    description: 'Password of user',
    example: 'Pass#123',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;
}
