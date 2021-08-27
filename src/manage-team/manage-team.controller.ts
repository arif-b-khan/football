import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ManageTeamService } from './manage-team.service';
import { CreateManageTeamDto } from './dto/create-manage-team.dto';
import { UpdateManageTeamDto } from './dto/update-manage-team.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseTimeInterceptor } from 'src/shared/response-time.interceptor';


@ApiTags("manage-team")
@UseInterceptors(ResponseTimeInterceptor)
@Controller('manage-team')
export class ManageTeamController {
  constructor(private readonly manageTeamService: ManageTeamService) {}

  @Post()
  create(@Body() createManageTeamDto: CreateManageTeamDto) {
    return this.manageTeamService.create(createManageTeamDto);
  }

  @Get()
  findAll() {
    return this.manageTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageTeamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageTeamDto: UpdateManageTeamDto) {
    return this.manageTeamService.update(+id, updateManageTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageTeamService.remove(+id);
  }
}
