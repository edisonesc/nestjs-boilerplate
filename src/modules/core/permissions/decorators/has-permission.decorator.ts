import { SetMetadata } from '@nestjs/common';

export const HasPermission = (access: string) =>
  SetMetadata('resource', access);
