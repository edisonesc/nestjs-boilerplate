import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionEntity } from '../permission.entity';
import { PERMISSION_PREFIX } from '../enums';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resource = this.reflector.get<string>(
      'resource',
      context.getHandler(),
    );
    return await this.checkPermissions(resource, context);
  }

  private async checkPermissions(
    resource: string,
    context: ExecutionContext,
  ): Promise<boolean> {
    if (!resource) return true;

    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;

    if (!userRole || !userRole.permissions) {
      return false;
    }

    const requiredPermission = this.getRequiredPermission(
      request.method,
      resource,
    );
    if (!requiredPermission) {
      return false;
    }

    return userRole.permissions.some(
      (p: PermissionEntity) => p.name === requiredPermission,
    );
  }

  private getRequiredPermission(
    method: string,
    resource: string,
  ): string | null {
    const methodMap: Record<string, PERMISSION_PREFIX> = {
      GET: PERMISSION_PREFIX.READ,
      POST: PERMISSION_PREFIX.CREATE,
      PUT: PERMISSION_PREFIX.UPDATE,
      PATCH: PERMISSION_PREFIX.UPDATE,
      DELETE: PERMISSION_PREFIX.DELETE,
    };

    const prefix = methodMap[method];
    return prefix ? `${prefix}${resource}` : null;
  }
}
