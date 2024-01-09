import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Projects')
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'project',
})
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<any> {
    return await this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() { limit, skip }) {
    return this.projectService.findAll(limit, skip);
  }

  @Get('/constructor/history')
  findByUserId(@Query() { id, limit, skip }) {
    return this.projectService.findByUserId(id, limit, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }
}
