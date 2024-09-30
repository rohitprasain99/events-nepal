import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import ThrottlerConfig from './config/throttler.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './config/database.config';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { ParticipantModule } from './participant/participant.module';
import { AuthModule } from './auth/auth.module';
import { OrganizerModule } from './organizer/organizer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    //protect applications from brute-force attacks is rate-limiting
    ThrottlerModule.forRoot([ThrottlerConfig]),
    EventModule,
    UserModule,
    OrganizerModule,
    ParticipantModule,
    AuthModule,
    OrganizerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
