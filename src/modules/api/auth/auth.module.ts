import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from './bcrypt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../../models/user/user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
