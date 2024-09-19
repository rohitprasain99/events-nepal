import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { OrganizerDetailModule } from './organizer-detail/organizer-detail.module';
import { ParticipantModule } from './participant/participant.module';
import { ParticipantEventModule } from './participant-event/participant-event.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import ThrottlerConfig from './config/throttler.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    //protect applications from brute-force attacks is rate-limiting
    ThrottlerModule.forRoot([ThrottlerConfig]),
    EventModule,
    UserModule,
    OrganizerDetailModule,
    ParticipantModule,
    ParticipantEventModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
