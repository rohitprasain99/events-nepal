import { PartialType } from '@nestjs/swagger';
import { CreateOrganizerDto } from './create-organizer.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrganizerDto extends PartialType(CreateOrganizerDto) {
  @IsNotEmpty()
  @IsString()
  updated_by: string;
}
