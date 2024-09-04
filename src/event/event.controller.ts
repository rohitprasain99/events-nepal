import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/core/decorators/response.decorator';
import { ResponseMessageUtility } from 'src/utils/responseMessage';
import { ResponseEnum } from 'src/utils/enums/response.enum';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {} //IOC

  /* SAME AS
  private readonly eventService;
  constructor() {
    this.eventService = new EventService();
  }
  */

  @Post()
  @ResponseMessage(ResponseMessageUtility('Event', ResponseEnum.ADDED))
  create(@Body() createTestDto: CreateEventDto) {
    return this.eventService.create(createTestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of events.' })
  @ResponseMessage(ResponseMessageUtility('Event', ResponseEnum.SENT))
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ResponseMessage(ResponseMessageUtility('Event', ResponseEnum.SENT))
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage(ResponseMessageUtility('Event', ResponseEnum.UPDATED))
  update(@Param('id') id: string, @Body() updateTestDto: UpdateEventDto) {
    return this.eventService.update(id, updateTestDto);
  }

  @Delete(':id')
  @ResponseMessage(ResponseMessageUtility('Event', ResponseEnum.REMOVED))
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
