import { PermissionEntity } from '../../modules/core/permissions/permission.entity';
import { RoleEntity } from '../../modules/core/role/role.entity';
import { DataSource } from 'typeorm';

export async function seedAdminPermission(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(RoleEntity);
  const permissionRepo = dataSource.getRepository(PermissionEntity);

  const adminRole = await roleRepo.findOne({ where: { name: 'Admin' } });
  const permissions = await permissionRepo.find();
  const permissionIds = permissions.map((p) => ({ id: p.id }));

  await roleRepo.save({
    ...adminRole,
    permissions: permissionIds,
  });
}
