import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionEntity } from './permission.entity';
import { Crud, CrudController, Override, ParsedBody } from '@dataui/crud';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from './guards/permission.guard';
import { HasPermission } from './decorators/has-permission.decorator';
import { PERMISSION_PREFIX, ROUTE_RESOURCE } from './enums';
import { CreatePermissionDTO } from './dto';
import { PermissionService } from './permission.service';

@Crud({
  model: {
    type: PermissionEntity,
  },
  routes: {
    exclude: [
      'createManyBase',
      'replaceOneBase',
      'updateOneBase',
      'getOneBase',
    ],
    getManyBase: {
      decorators: [HasPermission(ROUTE_RESOURCE.PERMISSIONS)],
    },
    deleteOneBase: {
      decorators: [HasPermission(ROUTE_RESOURCE.PERMISSIONS)],
    },
  },
  dto: {
    create: CreatePermissionDTO,
  },
})
@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Controller('permission')
export class PermissionController implements CrudController<PermissionEntity> {
  constructor(public service: PermissionService) {}

  get base(): CrudController<PermissionEntity> {
    return this;
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HasPermission(ROUTE_RESOURCE.PERMISSIONS)
  @Override('createOneBase')
  // @ParsedBody is specific to CRUD generators
  async createRole(@ParsedBody() dto: CreatePermissionDTO) {
    return await this.service.createPermission(dto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HasPermission(ROUTE_RESOURCE.PERMISSIONS)
  @Get('prefixes')
  getAllPermissionPrefixes() {
    const prefixes = PERMISSION_PREFIX;
    return Object.values(prefixes);
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HasPermission(ROUTE_RESOURCE.PERMISSIONS)
  @Get('resources')
  getAllResources() {
    const resources = PERMISSION_PREFIX;
    return Object.values(resources);
  }
}
