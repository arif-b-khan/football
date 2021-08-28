import { IsNotEmpty } from 'class-validator';

export class NameParam {
  @IsNotEmpty()
  name: string;
}
