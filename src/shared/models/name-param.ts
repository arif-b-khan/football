import { IsNotEmpty, IsNumberString } from 'class-validator';

export class NameParam {
  @IsNumberString()
  name: string;
}
