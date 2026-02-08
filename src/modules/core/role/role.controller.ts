import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@dataui/crud';
import { RoleEntity } from './role.entity';
import { HasPermission } from '../permissions/decorators/has-permission.decorator';
import { ROUTE_RESOURCE } from '../permissions/enums';
import { CreateRoleDTO, UpdateRoleDTO } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../permissions/guards/permission.guard';
import { RoleService } from './role.service';

@Crud({
  model: { type: RoleEntity },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    getOneBase: {
      decorators: [HasPermission(ROUTE_RESOURCE.ROLES)],
    },
    getManyBase: {
      decorators: [HasPermission(ROUTE_RESOURCE.ROLES)],
    },
    deleteOneBase: {
      decorators: [HasPermission(ROUTE_RESOURCE.ROLES)],
    },
  },
  query: {
    join: {
      permissions: {
        eager: false,
      },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
  dto: {
    create: CreateRoleDTO,
    update: UpdateRoleDTO,
  },
})
@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Controller('role')
export class RoleController implements CrudController<RoleEntity> {
  constructor(public service: RoleService) {}
  get base(): CrudController<RoleEntity> {
    return this;
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HasPermission(ROUTE_RESOURCE.ROLES)
  @Override('createOneBase')
  async createRole(@ParsedBody() dto: CreateRoleDTO) {
    return await this.service.createRole(dto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HasPermission(ROUTE_RESOURCE.ROLES)
  @Override('updateOneBase')
  async updateRole(
    // Using Parsed since it's wrapped by Crud
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateRoleDTO,
  ) {
    return await this.service.updateRole(req, dto);
  }
}
