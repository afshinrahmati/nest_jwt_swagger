import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export const Environment = {
  dev: 'dev',
  stage: 'stage',
  prod: 'prod',
} as const;

export class EnvironmentVariable {
  @IsEnum(Environment)
  NODE_ENV: keyof typeof Environment = Environment.dev;

  @IsString()
  @IsNotEmpty()
  MONGODB_URI!: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT!: number;

  @IsNumber()
  @IsNotEmpty()
  REDIS_DB!: number;

  @IsNumber()
  @IsNotEmpty()
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET!: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_TTL!: number;

  @IsString()
  @IsNotEmpty()
  SEND_EMAIL_URL!: string;
  @IsString()
  @IsNotEmpty()
  SEND_EMAIL_USERNAME!: string;
  @IsString()
  @IsNotEmpty()
  SEND_EMAIL_PASSWORD!: string;
  @IsNumber()
  @IsNotEmpty()
  SEND_EMAIL_FROM!: number;

  @IsNumber()
  @IsNotEmpty()
  SESSION_TIME!: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export function getEnvFile() {
  const nodeEnv = process.env.NODE_ENV as keyof typeof Environment;
  console.info(`Environment has been set to: ${nodeEnv}`);

  const validEnvs = Object.values(Environment);
  if (!nodeEnv || !validEnvs.includes(nodeEnv)) {
    throw new Error(
      // prettier-ignore
      `Invalid environment. Expected ${validEnvs.join(", ")} but got ${nodeEnv}`,
    );
  }

  return `.env.${nodeEnv}`;
}
