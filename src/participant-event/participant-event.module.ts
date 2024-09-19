import { Module } from '@nestjs/common';
import { ParticipantEventService } from './participant-event.service';
import { ParticipantEventController } from './participant-event.controller';

@Module({
  controllers: [ParticipantEventController],
  providers: [ParticipantEventService],
})
export class ParticipantEventModule {}
