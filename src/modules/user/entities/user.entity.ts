import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  // @Prop({ type: [{ type: Types.ObjectId, ref: Application.name }] })
  // applications: Types.Array<Application>;

  // @Prop({ type: [{ type: Types.ObjectId, ref: Project.name }] })
  // projects: Types.Array<Project>;
}

export const UserSchema = SchemaFactory.createForClass(User);
