import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';

interface Item {
  description: string;
  value: number;
}

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user_id: User | Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: Date })
  init_date: Date;

  @Prop({ required: true, type: Date })
  end_date: Date;

  @Prop({ required: true })
  items: Array<Item>;

  @Prop({ required: true })
  images: Array<string>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
