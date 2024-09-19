import { PartialType } from '@nestjs/swagger';
import { CreateParticipantEventDto } from './create-participant-event.dto';

export class UpdateParticipantEventDto extends PartialType(CreateParticipantEventDto) {}
