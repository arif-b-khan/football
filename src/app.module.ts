import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManageTeamModule } from './manage-team/manage-team.module';

@Module({
  imports: [ManageTeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
