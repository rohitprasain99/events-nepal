import { PartialType } from '@nestjs/swagger';
import { CreateOrganizerDetailDto } from './create-organizer-detail.dto';

export class UpdateOrganizerDetailDto extends PartialType(CreateOrganizerDetailDto) {}
