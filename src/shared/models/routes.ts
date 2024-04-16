import { TASK_ID_PARAM } from '../constants/constant-params';

export enum taskRoute {
  parent = 'tasks',
  getTasks = '/',
  getTaskById = `/${TASK_ID_PARAM}`,
  createTask = '/',
  deleteTask = `/${TASK_ID_PARAM}`,
  updateTaskStatus = `/${TASK_ID_PARAM}/status`,
}

export enum authRoute {
  parent = 'auth',
  signup = '/signup',
  signin = '/signin',
  refreshToken = '/refresh-token',
}
