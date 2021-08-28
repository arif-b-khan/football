import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class IdParam {
  @ApiProperty({ example: 1, description: 'id of an entity' })
  @IsNumberString()
  id: number;
}
