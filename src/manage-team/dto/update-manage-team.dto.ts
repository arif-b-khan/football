import { PartialType } from '@nestjs/swagger';
import { CreateManageTeamDto } from './create-manage-team.dto';

export class UpdateManageTeamDto extends PartialType(CreateManageTeamDto) {
    name: string;
    img: string;
}
