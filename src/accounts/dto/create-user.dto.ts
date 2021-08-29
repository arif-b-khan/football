import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../shared/match.decorator';

export class CreateUserDto {
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  @Match('password')
  confirmpassword: string;

  @IsEmail()
  email: string;
}
