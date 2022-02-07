import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { ConfigService } from '../../core/config/config.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, ConfigService],
  controllers: [UserController],
})
export class UserModule {}
