import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [AuthModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
