import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Get('/project/:id')
  findByProjectId(@Param('id') id: string) {
    return this.applicationService.findByProjectId(id);
  }

  @Get('/provider/history')
  findByProviderId(@Query() { id, limit, skip }) {
    return this.applicationService.findByProviderId(id, limit, skip);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }
}
