import { TASK_ID_PARAM } from '../constants/constant-params';
import { authRoute, taskRoute } from './routes';

describe('taskRoute', () => {
  it('should have the correct values', () => {
    expect(taskRoute.parent).toBe('tasks');
    expect(taskRoute.getTasks).toBe('/');
    expect(taskRoute.getTaskById).toBe(`/${TASK_ID_PARAM}`);
    expect(taskRoute.createTask).toBe('/');
    expect(taskRoute.deleteTask).toBe(`/${TASK_ID_PARAM}`);
    expect(taskRoute.updateTaskStatus).toBe(`/${TASK_ID_PARAM}/status`);
  });
});
describe('authRoute', () => {
  it('should have the correct values', () => {
    expect(authRoute.parent).toBe('auth');
    expect(authRoute.signup).toBe('/signup');
    expect(authRoute.signin).toBe('/signin');
    expect(authRoute.refreshToken).toBe('/refresh-token');
  });
});
