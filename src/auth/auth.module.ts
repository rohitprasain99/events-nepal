import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from 'src/user/user.module';
import { BcryptService } from 'src/core/bcryptjs/bcrypt.service';
import { LocalStrategy } from 'src/core/strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, LocalStrategy, JwtService],
})
export class AuthModule {}
