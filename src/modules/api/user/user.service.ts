import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../../../models/user/user.model';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { UpdateUserDto } from './dto/user.dto';
import { StatusEnum } from '../../../types/global';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly i18n: I18nService,
  ) {}

  async getAll(): Promise<UserDocument[]> {
    const user = await this.userModel
      .find()
      .select('_id firstName lastName email status role');
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async getOne(id: string) {
    const user = await this.userModel
      .findOne({ _id: id })
      .select('_id firstName lastName email status role');
    if (!user) {
      return this.i18n.t('global.error.message.NOT_USER_EXIST');
    }
    return user;
  }
  async UpdateOne(id: string, body: UpdateUserDto): Promise<any> {
    const user = this.userModel.findOne({ _id: id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const newUSer = this.userModel
      .findOneAndUpdate({ _id: id }, body, {
        new: true,
      })
      .select('_id firstName lastName email status role');
    return newUSer;
  }
  async DeleteOne(id: string): Promise<any> {
    const user = this.userModel.findOne({ _id: id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const newUSer = this.userModel
      .findOneAndUpdate(
        { _id: id },
        { status: StatusEnum.DELETED },
        {
          new: true,
        },
      )
      .select('_id firstName lastName email status role');
    return newUSer;
  }
}
