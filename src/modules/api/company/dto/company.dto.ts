import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../../../../types/global';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'forbix',
    description: 'name OF Company',
  })
  readonly name: string;
  @ApiProperty({
    example: '14003145',
    description: 'Code OF Company',
  })
  readonly code: string;
  @ApiProperty({
    example: 'Iran/Tehran',
    description: 'location OF Company',
  })
  readonly location: string;
  @ApiProperty({
    example: StatusEnum,
    description: 'status OF Company',
  })
  readonly status: StatusEnum;
}
