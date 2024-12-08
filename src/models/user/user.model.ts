import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoleEnum, StatusEnum } from '../../types/global';
import { CompanyModel } from '../company/company.model';

@Schema({ collection: 'users', timestamps: true })
export class UserModel {
  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: String, required: true })
  nationalCode!: string;

  @Prop({ type: String, required: true, index: true })
  phoneNumber!: string;
  @Prop({ type: String, required: true })
  password!: string;
  @Prop({ type: String, required: true, unique: true })
  email!: string;
  @Prop({ type: String, enum: StatusEnum, default: StatusEnum.ACTIVE })
  status!: string;
  @Prop({ type: Types.ObjectId, ref: 'CompanyModel' })
  companyId!: Types.ObjectId | CompanyModel | null;
  @Prop({
    type: String,
    enum: RoleEnum,
    required: true,
    default: RoleEnum.Employee,
  })
  role!: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export type UserDocument = HydratedDocument<UserModel>;
UserSchema.index(
  { email: 1, role: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } },
);
export const UserModelDefinition: ModelDefinition = {
  name: UserModel.name,
  schema: UserSchema,
};
