import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class UserAccountDto {
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Invalid password',
  })
  password: string;
}
