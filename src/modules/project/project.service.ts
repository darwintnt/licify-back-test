import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './entities/project.entity';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('projects') private readonly projectModel: Model<Project>,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(params: CreateProjectDto, file: any) {
    return await this.projectModel.create(params);
  }

  async findAll(limit: number = 10, skip: number = 0) {
    const count = await this.projectModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.projectModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: data,
      page_total: page_total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
