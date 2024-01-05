import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadsService } from '../uploads/uploads.service';
import { Project, ProjectDocument } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(params: CreateProjectDto, file: any) {
    const images = await this.uploadsService.uploadFile(file);

    return {
      data: await this.projectModel.create(params),
      images,
    };
  }

  async findAll(limit: number = 10, skip: number = 0) {
    const count = await this.projectModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.projectModel
      .find()
      .populate({
        path: 'user_id',
        select: 'name email',
      })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: data,
      page_total: page_total,
    };
  }

  async findByUserId(userId: string, limit: number = 10, skip: number = 0) {
    const count = await this.projectModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.projectModel
      .find({ user_id: userId })
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
