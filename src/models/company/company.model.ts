import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig, Types } from 'mongoose';
import { UserModel } from '../user/user.model';
import { StatusEnum } from '../../types/global';
import paginate from 'mongoose-paginate-v2';

@Schema({ collection: 'companies', timestamps: true })
export class CompanyModel {
  @Prop({ type: String, required: true })
  name!: string;
  @Prop({ type: String, required: true, unique: true })
  code!: string;
  @Prop({ type: String, required: true })
  location!: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'UserModel' })
  createdBy!: Types.ObjectId | UserModel;
  @Prop({
    type: String,
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
    required: true,
  })
  status!: StatusEnum;
}
export const CompanySchema = SchemaFactory.createForClass(CompanyModel);
export type CompanyDocument = HydratedDocument<
  CompanyModel,
  SchemaTimestampsConfig
>;
CompanySchema.plugin(paginate);
export const CompanyModelDefinition: ModelDefinition = {
  name: CompanyModel.name,
  schema: CompanySchema,
};
