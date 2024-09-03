import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({ example: 'name', description: 'swoyambhu sar safai' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'location', description: 'swoyambhu' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
