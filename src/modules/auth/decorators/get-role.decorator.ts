import { SetMetadata } from '@nestjs/common';

// - Models - //
import { Role } from 'src/shared/models/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
