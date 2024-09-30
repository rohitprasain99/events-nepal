import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { UpdateOrganizerStatus } from './dto/update-organizerStatus.dto';
import { ApiTags } from '@nestjs/swagger';

/*User Story for ORGANIZER 
   - CRUD -> should be approved by ADMIN
   - CRUD Event
   - approve Participant
  */

@ApiTags('Organizer')
@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto) {
    return this.organizerService.create(createOrganizerDto);
  }

  @Get()
  findAll() {
    return this.organizerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    return this.organizerService.update(id, updateOrganizerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizerService.remove(id);
  }

  @Post('change-status')
  changeOrganizerStatus(
    @Param('id') id: string,
    @Body() updateOrganizerStatusDto: UpdateOrganizerStatus,
  ) {
    return this.organizerService.changeOrganizerStatus(
      id,
      updateOrganizerStatusDto,
    );
  }
}
