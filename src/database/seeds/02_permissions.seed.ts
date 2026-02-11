import {
  PERMISSION_PREFIX,
  ROUTE_RESOURCE,
} from '../../modules/core/permissions/enums/index';
import { PermissionEntity } from '../../modules/core/permissions/permission.entity';
import { DataSource } from 'typeorm';
export async function seedPermissions(dataSource: DataSource) {
  const permissionRepo = dataSource.getRepository(PermissionEntity);
  const permissions = [
    {
      name: `${PERMISSION_PREFIX.CREATE}${ROUTE_RESOURCE.ROLES}`,
    },
    {
      name: `${PERMISSION_PREFIX.READ}${ROUTE_RESOURCE.ROLES}`,
    },
    {
      name: `${PERMISSION_PREFIX.UPDATE}${ROUTE_RESOURCE.ROLES}`,
    },
    {
      name: `${PERMISSION_PREFIX.DELETE}${ROUTE_RESOURCE.ROLES}`,
    },
    {
      name: `${PERMISSION_PREFIX.CREATE}${ROUTE_RESOURCE.PERMISSIONS}`,
    },
    {
      name: `${PERMISSION_PREFIX.READ}${ROUTE_RESOURCE.PERMISSIONS}`,
    },
    {
      name: `${PERMISSION_PREFIX.UPDATE}${ROUTE_RESOURCE.PERMISSIONS}`,
    },
    {
      name: `${PERMISSION_PREFIX.DELETE}${ROUTE_RESOURCE.PERMISSIONS}`,
    },
    {
      name: `${PERMISSION_PREFIX.CREATE}${ROUTE_RESOURCE.USERS}`,
    },
    {
      name: `${PERMISSION_PREFIX.READ}${ROUTE_RESOURCE.USERS}`,
    },
    {
      name: `${PERMISSION_PREFIX.UPDATE}${ROUTE_RESOURCE.USERS}`,
    },
    {
      name: `${PERMISSION_PREFIX.DELETE}${ROUTE_RESOURCE.USERS}`,
    },
  ];

  await permissionRepo.save(permissions, { chunk: 500 });
}
