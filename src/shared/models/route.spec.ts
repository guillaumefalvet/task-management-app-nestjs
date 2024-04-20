import { TASK_ID_PARAM } from '../constants/constant-params';
import { AuthUrlEnum, TaskUrlEnum } from './routes';

describe('taskRoute', () => {
  it('should have the correct values', () => {
    expect(TaskUrlEnum.base).toBe('tasks');
    expect(TaskUrlEnum.getTasks).toBe('/');
    expect(TaskUrlEnum.getTaskById).toBe(`/${TASK_ID_PARAM}`);
    expect(TaskUrlEnum.createTask).toBe('/');
    expect(TaskUrlEnum.deleteTask).toBe(`/${TASK_ID_PARAM}`);
    expect(TaskUrlEnum.updateTaskStatus).toBe(`/${TASK_ID_PARAM}/status`);
  });
});
describe('authRoute', () => {
  it('should have the correct values', () => {
    expect(AuthUrlEnum.base).toBe('auth');
    expect(AuthUrlEnum.createAccount).toBe('/create-account');
    expect(AuthUrlEnum.login).toBe('/login');
    expect(AuthUrlEnum.refreshAuthToken).toBe('/refresh-token');
  });
});
