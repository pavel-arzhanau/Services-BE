import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './tokens.model';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([Token]),
    JwtModule.register({}),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
