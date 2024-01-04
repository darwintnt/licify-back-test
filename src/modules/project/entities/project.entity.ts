import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  init_date: string;

  @Prop({ required: true })
  end_date: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
