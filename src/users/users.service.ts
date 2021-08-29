import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isFullWidth } from 'class-validator';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(
    @InjectModel(User)
    public readonly user: typeof User,
  ) {}

  public async findOne(username: string): Promise<User> {
    const users: User[] = await this.user.findAll({
      where: {
        username: username,
      },
      attributes: ['username', 'password', 'createdAt'],
    });

    if (users !== null && users.length === 1) return users[0];
    else throw new NotFoundException('User not found');
  }

  async create(user: User): Promise<User> {
    const userExists: User[] = await User.findAll({
      where: {
        username: user.username,
      },
    });
    if (userExists.length === 0) {
      const newUser: User = await User.create(user);
      newUser.save();
      return newUser;
    } else {
      throw new BadRequestException('User already exists');
    }
  }
}
