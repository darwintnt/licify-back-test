import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../uploads/pipes/sharp-pipe/sharp-pipe';

@Controller({
  version: '1',
  path: 'project',
})
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  async create(
    @UploadedFile(SharpPipe) files: Array<Express.Multer.File>,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<any> {
    return await this.projectService.create(createProjectDto, files);
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
