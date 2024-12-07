import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/config.module';
import { ApiModule } from './modules/api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomConfigService } from './modules/config/config.service';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'node:path';
import { LoggerMiddleware } from './components/middleware/logger.middleware';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) => ({
        uri: configService.MONGODB_URI,
        connectionFactory(connection) {
          connection.on('connected', () =>
            console.log(
              '######### MongoDB is connected successfully #########',
            ),
          );
          connection._events.connected();
          return connection;
        },
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: join(process.cwd(), 'locales'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    RedisModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
      useFactory: (configService: CustomConfigService) => {
        return {
          type: 'single',
          options: {
            host: configService.REDIS_HOST,
            port: configService.REDIS_PORT,
            db: configService.REDIS_DB,
          },
        };
      },
    }),
    JwtModule.registerAsync({
      imports: [CustomConfigModule],
      inject: [CustomConfigService],

      useFactory: async (configService: CustomConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: {
          expiresIn: configService.JWT_ACCESS_TOKEN_TTL,
        },
      }),
    }),
    ApiModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
