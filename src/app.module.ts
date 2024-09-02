import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { EventModule } from './event/event.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TestModule, EventModule],
})
export class AppModule {}
