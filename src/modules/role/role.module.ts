import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from './role.repository';
import { UserRepository } from '../user/user.repository';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository, UserRepository])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
