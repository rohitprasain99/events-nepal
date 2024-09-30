import { Injectable } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { Repository } from 'typeorm';
import { UpdateOrganizerStatus } from './dto/update-organizerStatus.dto';

@Injectable()
export class OrganizerService {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizerRepository: Repository<Organizer>,
  ) {}

  async create(createOrganizerDto: CreateOrganizerDto) {
    return await this.organizerRepository
      .createQueryBuilder()
      .insert()
      .into(Organizer)
      .values(createOrganizerDto)
      .execute();
  }

  async findAll() {
    return await this.organizerRepository.createQueryBuilder().getMany();
  }

  async findOne(id: string) {
    return await this.organizerRepository
      .createQueryBuilder('organizer')
      .where('organizer.id =:organizerId', { organiserId: id });
  }

  async update(id: string, updateOrganizerDto: UpdateOrganizerDto) {
    return await this.organizerRepository
      .createQueryBuilder('organizer')
      .update(Organizer)
      .set(updateOrganizerDto)
      .where('organizer.id =:organizerId', { organizerId: id })
      .execute();
  }

  async remove(id: string) {
    return await this.organizerRepository
      .createQueryBuilder('organizer')
      .delete()
      .from(Organizer)
      .where('organizer.id =:organizerId', { organizerId: id })
      .execute();
  }

  async changeOrganizerStatus(
    id: string,
    updateOrganizerStatusDto: UpdateOrganizerStatus,
  ) {
    return await this.organizerRepository
      .createQueryBuilder('organizer')
      .update(Organizer)
      .set(updateOrganizerStatusDto)
      .where('organizer.id =:organizerId', { organizerId: id })
      .execute();
  }
}
