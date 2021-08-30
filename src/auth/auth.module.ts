import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStratergy } from './stratergies/jwt-stratergy';
import { LocalStrategy } from './stratergies/local-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService, UsersService, JwtStratergy, LocalStrategy],
  exports: [AuthService, UsersService, JwtStratergy],
})
export class AuthModule {}
