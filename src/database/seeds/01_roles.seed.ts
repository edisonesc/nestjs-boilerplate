import { RoleEntity } from '../../modules/core/role/role.entity';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSource: DataSource) {
  await dataSource.initialize();

  const roleRepo = dataSource.getRepository(RoleEntity);

  await roleRepo.save([
    {
      name: 'Admin',
    },
    {
      name: 'User',
    },
  ]);
}
