import { TASK_ID_PARAM } from '../constants/constant-params';

export enum taskUrlEnum {
  base = 'tasks',
  getTasks = '/',
  getTaskById = `/${TASK_ID_PARAM}`,
  createTask = '/',
  deleteTask = `/${TASK_ID_PARAM}`,
  updateTaskStatus = `/${TASK_ID_PARAM}/status`,
}

export enum authUrlEnum {
  base = 'auth',
  createAccount = '/create-account',
  login = '/login',
  refreshAuthToken = '/refresh-token',
}

export enum apiDocsUrlEnum {
  rest = 'openapi-docs',
  webSocket = 'asyncapi-docs',
}
