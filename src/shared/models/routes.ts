import { TASK_ID_PARAM } from '../constants/constant-params';

export enum taskUrl {
  base = 'tasks',
  getTasks = '/',
  getTaskById = `/${TASK_ID_PARAM}`,
  createTask = '/',
  deleteTask = `/${TASK_ID_PARAM}`,
  updateTaskStatus = `/${TASK_ID_PARAM}/status`,
}

export enum authUrl {
  base = 'auth',
  createAccount = '/create-account',
  login = '/login',
  refreshAuthToken = '/refresh-token',
}

export enum apiDocsUrl {
  rest = 'openapi-docs',
  webSocket = 'asyncapi-docs',
}
