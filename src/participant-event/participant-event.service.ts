import { Injectable } from '@nestjs/common';
import { CreateParticipantEventDto } from './dto/create-participant-event.dto';
import { UpdateParticipantEventDto } from './dto/update-participant-event.dto';

@Injectable()
export class ParticipantEventService {
  create(createParticipantEventDto: CreateParticipantEventDto) {
    return 'This action adds a new participantEvent';
  }

  findAll() {
    return `This action returns all participantEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participantEvent`;
  }

  update(id: number, updateParticipantEventDto: UpdateParticipantEventDto) {
    return `This action updates a #${id} participantEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} participantEvent`;
  }
}
