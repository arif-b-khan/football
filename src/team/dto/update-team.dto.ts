import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  img: string;
}
