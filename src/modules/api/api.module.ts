import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [AuthModule, UsersModule],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtGuard,
  //   },
  //   JwtStrategy,
  // ],
})
export class ApiModule {}
