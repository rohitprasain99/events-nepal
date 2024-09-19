import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizerDetailService } from './organizer-detail.service';
import { CreateOrganizerDetailDto } from './dto/create-organizer-detail.dto';
import { UpdateOrganizerDetailDto } from './dto/update-organizer-detail.dto';

@Controller('organizer-detail')
export class OrganizerDetailController {
  constructor(private readonly organizerDetailService: OrganizerDetailService) {}

  @Post()
  create(@Body() createOrganizerDetailDto: CreateOrganizerDetailDto) {
    return this.organizerDetailService.create(createOrganizerDetailDto);
  }

  @Get()
  findAll() {
    return this.organizerDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizerDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizerDetailDto: UpdateOrganizerDetailDto) {
    return this.organizerDetailService.update(+id, updateOrganizerDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizerDetailService.remove(+id);
  }
}
