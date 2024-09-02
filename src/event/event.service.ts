import { HttpStatus, Injectable } from '@nestjs/common';
import { IEvent } from './event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable() // so that IOC can be performed
export class EventService {
  // private readonly event: IEvent[] = [];
  private events: IEvent[] = [
    { id: 1, name: 'pashupati sar safai', location: 'pashupati templee' },
    { id: 2, name: 'swoyambhu sar safai', location: 'swoyambhu' },
  ];

  create(createEventDto: CreateEventDto) {
    this.events.push({
      id: this.events[this.events.length - 1].id + 1,
      name: createEventDto.name,
      location: createEventDto.location,
    });
    return {
      status: HttpStatus.CREATED,
      events: this.events,
    };
  }

  findAll(): IEvent[] {
    return this.events;
  }

  findOne(id: number) {
    if (id > 0 && id <= this.events.length) {
      return this.events[id - 1];
    } else {
      return 'item not found';
    }
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    if (id > 0 && id <= this.events.length) {
      this.events.splice(id - 1, 1, { id, ...updateEventDto });
      return this.events[id - 1];
    } else {
      return 'item not found';
    }
  }

  remove(id: number) {
    if (id > 0 && id <= this.events.length) {
      this.events.splice(id - 1, 1);
      return this.events;
    } else {
      return 'item not found';
    }
  }
}
