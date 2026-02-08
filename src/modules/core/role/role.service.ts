import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionEntity } from '../permissions/permission.entity';
import { CreateRoleDTO, UpdateRoleDTO } from './dto';
import { CrudRequest } from '@dataui/crud';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {
    super(roleRepository);
  }

  async createRole(dto: CreateRoleDTO) {
    try {
      const permissions = await this.permissionRepository.find({
        where: { id: In(dto.permissionIds) },
      });

      await this.roleRepository.save({
        name: dto.name,
        permissions: permissions,
      });

      return {
        message: 'Role created successfully',
      };
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.BAD_REQUEST);
    }
  }

  async updateRole(req: CrudRequest, dto: UpdateRoleDTO) {
    try {
      const roleId = req.parsed.paramsFilter[0].value;

      const role = await this.roleRepository.findOne({ where: { id: roleId } });

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      const permissions = await this.permissionRepository.find({
        where: { id: In(dto.permissionIds ?? []) },
      });

      role.name = dto.name || role.name;
      role.permissions = permissions;

      await this.roleRepository.save(role);
      return {
        message: 'Role updated successfully',
      };
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.BAD_REQUEST);
    }
  }
}
