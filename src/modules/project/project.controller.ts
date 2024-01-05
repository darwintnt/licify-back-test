import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../uploads/pipes/sharp-pipe/sharp-pipe';

@Controller('project')
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

  @Get(':id')
  findAll(@Query() { limit, skip }) {
    return this.projectService.findAll(limit, skip);
  }

  @Get('/constructor/history')
  findByUserId(@Query() { id, limit, skip }) {
    return this.projectService.findByUserId(id, limit, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
