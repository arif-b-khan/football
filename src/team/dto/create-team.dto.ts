import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  img: string;
}
