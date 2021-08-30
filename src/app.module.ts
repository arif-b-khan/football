import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { AppClusterService } from './app-cluster/app-cluster.service';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'litedb3',
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TeamModule,
    UsersModule,
    AuthModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppClusterService],
})
export class AppModule {}
