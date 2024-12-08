import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { StatusEnum } from '../../types/global';

@Schema({ collection: 'companies', timestamps: true })
export class CompanyModel {
  @Prop({ type: String, required: true })
  name!: string;
  @Prop({ type: String, required: true, unique: true })
  code!: string;
  @Prop({ type: String, required: true })
  location!: string;

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
export const CompanyModelDefinition: ModelDefinition = {
  name: CompanyModel.name,
  schema: CompanySchema,
};
