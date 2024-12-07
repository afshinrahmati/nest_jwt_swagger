import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../../models/user/user.model';
@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
