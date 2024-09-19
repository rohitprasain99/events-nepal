import { Module } from '@nestjs/common';
import { OrganizerDetailService } from './organizer-detail.service';
import { OrganizerDetailController } from './organizer-detail.controller';

@Module({
  controllers: [OrganizerDetailController],
  providers: [OrganizerDetailService],
})
export class OrganizerDetailModule {}
