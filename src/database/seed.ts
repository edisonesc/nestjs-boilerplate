import '../../env/env.config';
import { RoleEntity } from '../modules/core/role/role.entity';
import { dataSource } from './data-source';
import { seedRoles } from './seeds/01_roles.seed';
import { seedPermissions } from './seeds/02_permissions.seed';
import { seedAdminPermission } from './seeds/03_admin_permissions.seed';
import { seedUsers } from './seeds/04_users.seed';

async function seed() {
  await seedRoles(dataSource);
  await seedPermissions(dataSource);
  await seedAdminPermission(dataSource);
  await seedUsers(dataSource);
}

seed()
  .then(() => {
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
