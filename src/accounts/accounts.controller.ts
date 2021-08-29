import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local.guard';
import { User } from '../users/entities/user';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAccountDto } from './dto/user-account.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'Create new user' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() userAccountDto: UserAccountDto) {
    return this.authService.login(userAccountDto);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'Create new user' })
  @Post('create')
  async create(@Body() userAccountDto: CreateUserDto): Promise<User> {
    const user: User = <User>{
      username: userAccountDto.username,
      password: await bcrypt.hash(userAccountDto.password, 10),
      email: userAccountDto.email,
    };
    return this.userService.create(user);
  }
}
