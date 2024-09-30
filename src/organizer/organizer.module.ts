import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { OrganizerController } from './organizer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';

@Module({
  controllers: [OrganizerController],
  providers: [OrganizerService],

  imports: [TypeOrmModule.forFeature([Organizer])],
})
export class OrganizerModule {}
