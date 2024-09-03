import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'name', description: 'swoyambhu sar safai' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'location', description: 'swoyambhu' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
