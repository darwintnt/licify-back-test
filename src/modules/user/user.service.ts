import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    return this.userModel.create(user);
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findById(id: string) {
    const data = await this.userModel.findById(id, 'name email role');
    return { data };
  }
}
