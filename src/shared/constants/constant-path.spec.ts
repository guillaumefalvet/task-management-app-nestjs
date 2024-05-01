import {
  API_PATH_BASE,
  API_PATH_AUTH,
  API_PATH_TASK,
  API_PATH_TASK_GET_ALL_PATH,
  API_PATH_TASK_GET_BY_ID_PATH,
  API_PATH_TASK_CREATE_PATH,
  API_PATH_TASK_DELETE_PATH,
  API_PATH_TASK_UPDATE_STATUS_PATH,
  API_PATH_AUTH_CREATE,
  API_PATH_AUTH_LOGIN,
  API_PATH_AUTH_REFRESH_TOKEN,
} from './constant-path';

describe('API Paths', () => {
  it('Task API paths are correctly defined', () => {
    expect(API_PATH_TASK).toBe('/api/tasks');
    expect(API_PATH_TASK_GET_ALL_PATH).toBe('/api/tasks/'); // '/api/tasks/
    expect(API_PATH_TASK_GET_BY_ID_PATH).toBe('/api/tasks/:id');
    expect(API_PATH_TASK_CREATE_PATH).toBe('/api/tasks/');
    expect(API_PATH_TASK_DELETE_PATH).toBe('/api/tasks/:id');
    expect(API_PATH_TASK_UPDATE_STATUS_PATH).toBe('/api/tasks/:id/status');
  });

  it('Auth API paths are correctly defined', () => {
    expect(API_PATH_AUTH).toBe('/api/auth');
    expect(API_PATH_AUTH_CREATE).toBe('/api/auth/create-account');
    expect(API_PATH_AUTH_LOGIN).toBe('/api/auth/login');
    expect(API_PATH_AUTH_REFRESH_TOKEN).toBe('/api/auth/refresh-token');
  });

  it('Base API path is correctly defined', () => {
    expect(API_PATH_BASE).toBe('/api');
  });
});
