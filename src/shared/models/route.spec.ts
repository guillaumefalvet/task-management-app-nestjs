import { TASK_ID_PARAM } from '../constants/constant-params';
import { authUrlEnum, taskUrlEnum } from './routes';

describe('taskRoute', () => {
  it('should have the correct values', () => {
    expect(taskUrlEnum.base).toBe('tasks');
    expect(taskUrlEnum.getTasks).toBe('/');
    expect(taskUrlEnum.getTaskById).toBe(`/${TASK_ID_PARAM}`);
    expect(taskUrlEnum.createTask).toBe('/');
    expect(taskUrlEnum.deleteTask).toBe(`/${TASK_ID_PARAM}`);
    expect(taskUrlEnum.updateTaskStatus).toBe(`/${TASK_ID_PARAM}/status`);
  });
});
describe('authRoute', () => {
  it('should have the correct values', () => {
    expect(authUrlEnum.base).toBe('auth');
    expect(authUrlEnum.createAccount).toBe('/create-account');
    expect(authUrlEnum.login).toBe('/login');
    expect(authUrlEnum.refreshAuthToken).toBe('/refresh-token');
  });
});
