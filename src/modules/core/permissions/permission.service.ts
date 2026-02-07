import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { PermissionEntity } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './dto';
import { PERMISSION_PREFIX } from './enums/permission-prefix.enum';
import { ROUTE_RESOURCE } from './enums/route-resource.enum';

@Injectable()
export class PermissionService extends TypeOrmCrudService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    private repository: Repository<PermissionEntity>,
  ) {
    super(repository);
  }

  async createPermission(dto: CreatePermissionDTO) {
    try {
      const [prefix, resource] = dto.name.split('_');

      if (
        !Object.values(PERMISSION_PREFIX).includes(
          prefix as PERMISSION_PREFIX,
        ) ||
        !Object.values(ROUTE_RESOURCE).includes(resource as ROUTE_RESOURCE)
      )
        throw new HttpException(
          'Invalid format. Expected: <prefix>_<resource>',
          HttpStatus.BAD_REQUEST,
        );

      const permission = await this.repository.create(dto);
      await this.repository.save(permission);

      return {
        message: 'Permission created',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create permission',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
