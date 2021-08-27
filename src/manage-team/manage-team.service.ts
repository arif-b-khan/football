import { Injectable } from '@nestjs/common';
import { CreateManageTeamDto } from './dto/create-manage-team.dto';
import { UpdateManageTeamDto } from './dto/update-manage-team.dto';

@Injectable()
export class ManageTeamService {
  create(createManageTeamDto: CreateManageTeamDto) {
    return 'This action adds a new manageTeam';
  }

  findAll() {
    return `This action returns all manageTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manageTeam`;
  }

  update(id: number, updateManageTeamDto: UpdateManageTeamDto) {
    return `This action updates a #${id} manageTeam`;
  }

  remove(id: number) {
    return `This action removes a #${id} manageTeam`;
  }
}
