import { TASK_ID_PARAM } from '../constants/constant-params';
import { authUrl, taskUrl } from './routes';

describe('taskRoute', () => {
  it('should have the correct values', () => {
    expect(taskUrl.base).toBe('tasks');
    expect(taskUrl.getTasks).toBe('/');
    expect(taskUrl.getTaskById).toBe(`/${TASK_ID_PARAM}`);
    expect(taskUrl.createTask).toBe('/');
    expect(taskUrl.deleteTask).toBe(`/${TASK_ID_PARAM}`);
    expect(taskUrl.updateTaskStatus).toBe(`/${TASK_ID_PARAM}/status`);
  });
});
describe('authRoute', () => {
  it('should have the correct values', () => {
    expect(authUrl.base).toBe('auth');
    expect(authUrl.createAccount).toBe('/create-account');
    expect(authUrl.login).toBe('/login');
    expect(authUrl.refreshAuthToken).toBe('/refresh-token');
  });
});
