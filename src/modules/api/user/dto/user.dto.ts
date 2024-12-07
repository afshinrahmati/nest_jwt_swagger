import { IsEmail, IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Atest@example.com',
    description: 'Email OF User',
  })
  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  readonly email: string;

  @ApiProperty({
    description: 'firstname OF User',
    example: 'Afshin',
  })
  @IsOptional()
  @IsString()
  readonly firstname: string;
  @ApiProperty({
    description: 'lastname OF User',
    example: 'Rahmati',
  })
  @IsOptional()
  @IsString()
  readonly lastname: string;
  @ApiProperty({
    description: 'phoneNumber OF User',
    example: '09108348429',
  })
  @IsOptional()
  @IsString()
  readonly phoneNumber: string;
  @ApiProperty({
    description: 'nationalCode OF User',
    example: '0023415649',
  })
  @IsOptional()
  @IsString()
  readonly nationalCode: string;
}
