import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../../../models/user/user.model';
import { Model, Types } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { I18nService } from 'nestjs-i18n';
import { SignInDto } from './dto/sign-in.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { CustomConfigService } from '../../config/config.service';
import { JwtService } from '@nestjs/jwt';
import { CompanyModel } from '../../../models/company/company.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(CompanyModel.name)
    private readonly companyModel: Model<CompanyModel>,
    @InjectRedis() private readonly redis: Redis,
    private readonly bcryptService: BcryptService,
    private readonly i18n: I18nService,
    private readonly config: CustomConfigService,
    private jwtService: JwtService,
  ) {}
  async login(user: UserDocument): Promise<{ access_token: string }> {
    return await this.generateAccessToken(user);
  }
  async register(body: SignUpDto) {
    const {
      email,
      password: pass,
      phoneNumber,
      lastname,
      firstname,
      nationalCode,
      role,
      companyId,
    } = body;
    const user = await this.userModel.findOne({ email: email, role: role });
    if (user) {
      throw new ConflictException(`User [${email}] already exist`);
    }
    const compmany = await this.companyModel.findOne({ _id: companyId });
    // if (!compmany) {
    //   throw new BadRequestException('COMPANY_NOT_FOUND');
    // }
    try {
      const password = await this.bcryptService.hashPassword(pass);
      await this.userModel.create({
        password,
        email,
        phoneNumber,
        nationalCode,
        lastName: lastname,
        firstName: firstname,
        companyId: compmany,
      });
      return this.i18n.t('global.success.user.CREATE');
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async validateUser(body: SignInDto): Promise<UserDocument> {
    const { email, password } = body;
    const user: UserDocument = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const isPasswordMatch = await this.bcryptService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }
  private async generateAccessToken(
    userInfo: UserDocument,
  ): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(
        {
          email: userInfo.email,
          id: userInfo.id,
        },
        {
          secret: this.config.JWT_SECRET,
          expiresIn: this.config.JWT_ACCESS_TOKEN_TTL,
        },
      ),
    };
  }
  async signOut(userId: string) {
    this.redis.del(`user-${userId}`);
  }
}
