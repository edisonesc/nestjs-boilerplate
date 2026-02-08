import { TypeOrmModule } from '@nestjs/typeorm';
import { imports } from 'src/database/orm.config';
import { RoleEntity } from './role.entity';
import { PermissionEntity } from '../permissions/permission.entity';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
