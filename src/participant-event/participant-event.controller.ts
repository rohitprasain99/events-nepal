import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantEventService } from './participant-event.service';
import { CreateParticipantEventDto } from './dto/create-participant-event.dto';
import { UpdateParticipantEventDto } from './dto/update-participant-event.dto';

@Controller('participant-event')
export class ParticipantEventController {
  constructor(private readonly participantEventService: ParticipantEventService) {}

  @Post()
  create(@Body() createParticipantEventDto: CreateParticipantEventDto) {
    return this.participantEventService.create(createParticipantEventDto);
  }

  @Get()
  findAll() {
    return this.participantEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantEventDto: UpdateParticipantEventDto) {
    return this.participantEventService.update(+id, updateParticipantEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantEventService.remove(+id);
  }
}
