import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariable } from './env.validation.js';

@Injectable()
export class CustomConfigService {
  constructor(
    private configService: ConfigService<EnvironmentVariable, true>,
  ) {}

  get env() {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get MONGODB_URI() {
    return this.configService.get('MONGODB_URI', { infer: true });
  }

  get REDIS_HOST() {
    return this.configService.get('REDIS_HOST', { infer: true });
  }

  get REDIS_PORT() {
    return this.configService.get('REDIS_PORT', { infer: true });
  }
  get REDIS_DB() {
    return this.configService.get('REDIS_DB', { infer: true });
  }
  get PORT() {
    return this.configService.get('PORT', {
      infer: true,
    });
  }

  get JWT_SECRET() {
    return this.configService.get('JWT_SECRET', {
      infer: true,
    });
  }
  get JWT_ACCESS_TOKEN_TTL() {
    return this.configService.get('JWT_ACCESS_TOKEN_TTL', {
      infer: true,
    });
  }

  get SEND_EMAIL_URL() {
    return this.configService.get('SEND_EMAIL_URL', { infer: true });
  }
  get SEND_EMAIL_USERNAME() {
    return this.configService.get('SEND_EMAIL_USERNAME', { infer: true });
  }
  get SEND_EMAIL_PASSWORD() {
    return this.configService.get('SEND_EMAIL_PASSWORD', { infer: true });
  }
}
