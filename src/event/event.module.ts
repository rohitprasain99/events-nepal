import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  providers: [EventService],
  controllers: [EventController],
  imports: [],
  exports: [],
})
export class EventModule {}
