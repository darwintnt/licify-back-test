import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Project } from 'src/modules/project/entities/project.entity';
import { User } from 'src/modules/user/entities/user.entity';

import { Document, Types } from 'mongoose';

interface Item {
  description: string;
  value: number;
}

export type ApplicationDocument = Application & Document;

@Schema({
  timestamps: true,
})
export class Application {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user_id: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Project.name })
  project_id: Project | Types.ObjectId;

  @Prop({ required: true })
  items: Array<Item>;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
