import { RoleEntity } from '../../modules/core/role/role.entity';
import { UserEntity } from '../../modules/core/user/user.entity';
import { hashPassword } from '../../shared/utils';
import { DataSource } from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

export async function seedUsers(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(RoleEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const adminRole = await roleRepo.findOne({ where: { name: 'Admin' } });
  const userRole = await roleRepo.findOne({ where: { name: 'User' } });

  const users = [
    {
      id: uuidV4(),
      email: 'admin@gmail.com',
      password: await hashPassword('password'),
      role_id: adminRole?.id,
    },
    {
      id: uuidV4(),
      email: 'user@gmail.com',
      password: await hashPassword('password'),
      role_id: userRole?.id,
    },
  ];

  await userRepo.save(users, { chunk: 500 });
}
