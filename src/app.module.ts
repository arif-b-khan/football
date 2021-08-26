import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
