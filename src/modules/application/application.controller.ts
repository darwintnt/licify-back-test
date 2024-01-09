import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Applications')
@ApiBearerAuth()
@Controller({
  version: '1',
  path: 'application',
})
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
