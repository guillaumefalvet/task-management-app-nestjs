import { Role } from './role.enum';

describe('Role', () => {
  it('should have the correct values', () => {
    expect(Role.USER).toEqual('USER');
    expect(Role.ADMIN).toEqual('ADMIN');
  });
});
