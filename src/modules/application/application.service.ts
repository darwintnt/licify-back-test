import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import {
  Application,
  ApplicationDocument,
} from './entities/application.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
  ) {}

  async create(params: CreateApplicationDto) {
    return await this.applicationModel.create({
      ...params,
      user_id: new ObjectId(params.user_id),
      project_id: new ObjectId(params.project_id),
    });
  }

  async findByProjectId(projectId: string) {
    return await this.applicationModel
      .find({ project_id: projectId })
      .populate(['project_id', 'user_id'])
      .exec();
  }

  async findByProviderId(
    providerId: string,
    limit: number = 10,
    skip: number = 0,
  ) {
    const count = await this.applicationModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const data = await this.applicationModel
      .find({ user_id: new ObjectId(providerId) })
      .populate('project_id', '_id name')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: data,
      page_total: page_total,
    };
  }

  async findAll() {
    return await this.applicationModel.find();
  }
}
