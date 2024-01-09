import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './entities/project.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(params: CreateProjectDto) {
    return {
      data: await this.projectModel.create({
        ...params,
        user_id: new ObjectId(params.user_id),
      }),
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
      .find({ user_id: new ObjectId(userId) })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: data,
      page_total: page_total,
    };
  }

  async findOne(id: string) {
    return {
      data: await this.projectModel.findById(id),
    };
  }
}
