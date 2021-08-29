import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [AuthModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
