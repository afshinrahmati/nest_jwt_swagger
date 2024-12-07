import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../../../models/user/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async getAll(): Promise<UserDocument> {
    const user = await this.userModel.findOne({});
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
