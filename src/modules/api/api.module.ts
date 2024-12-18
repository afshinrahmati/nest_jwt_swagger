import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [AuthModule, UsersModule, CompanyModule],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtGuard,
  //   },
  //   JwtStrategy,
  // ],
})
export class ApiModule {}
