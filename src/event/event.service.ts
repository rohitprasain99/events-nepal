import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable() // so that IOC can be performed
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const eventResponse = await this.eventRepository.save({
        ...createEventDto,
        // created_by: 'ADMIN',
      });
      return eventResponse;
    } catch (e) {
      console.log(e);
      throw new HttpException('Could not add event', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return await this.eventRepository.createQueryBuilder('events').getMany();
    } catch (e) {
      console.log(e);
      throw new HttpException('Could not fetch event', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Event> {
    try {
      return await this.eventRepository
        .createQueryBuilder('events')
        .where('id =:eventId', { eventId: id })
        .getOne();
    } catch (e) {
      console.log(e);
      throw new HttpException('Could not fetch event', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      return await this.eventRepository
        .createQueryBuilder()
        .update(Event)
        .set({ ...updateEventDto })
        .where('id =:eventId', { eventId: id })
        .execute();
    } catch (e) {
      console.log(e);
      throw new HttpException('Could not update event', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.eventRepository.delete({
        id,
      });
    } catch (e) {
      console.log(e);
      throw new HttpException('Could not delete event', HttpStatus.BAD_REQUEST);
    }
  }
}
