import { Injectable } from '@nestjs/common';
import { CreateOrganizerDetailDto } from './dto/create-organizer-detail.dto';
import { UpdateOrganizerDetailDto } from './dto/update-organizer-detail.dto';

@Injectable()
export class OrganizerDetailService {
  create(createOrganizerDetailDto: CreateOrganizerDetailDto) {
    return 'This action adds a new organizerDetail';
  }

  findAll() {
    return `This action returns all organizerDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizerDetail`;
  }

  update(id: number, updateOrganizerDetailDto: UpdateOrganizerDetailDto) {
    return `This action updates a #${id} organizerDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizerDetail`;
  }
}
