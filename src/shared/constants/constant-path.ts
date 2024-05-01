import { TASK_ID_PARAM } from './constant-params';

// -- Base API path -- //
export const API_PATH_BASE = '/api';

// - OPEN_API - //
export const API_PATH_DOCS = `/docs/open_api`;

// -- Task API paths -- //
export const API_PATH_TASK = `${API_PATH_BASE}/tasks`;
export const API_PATH_TASK_GET_ALL_PATH = `${API_PATH_TASK}/`;
export const API_PATH_TASK_GET_BY_ID_PATH = `${API_PATH_TASK}/:${TASK_ID_PARAM}`;
export const API_PATH_TASK_CREATE_PATH = `${API_PATH_TASK}/`;
export const API_PATH_TASK_DELETE_PATH = `${API_PATH_TASK}/:${TASK_ID_PARAM}`;
export const API_PATH_TASK_UPDATE_STATUS_PATH = `${API_PATH_TASK}/:${TASK_ID_PARAM}/status`;

// -- Auth API paths -- //
export const API_PATH_AUTH = `${API_PATH_BASE}/auth`;
export const API_PATH_AUTH_CREATE = `${API_PATH_AUTH}/create-account`;
export const API_PATH_AUTH_LOGIN = `${API_PATH_AUTH}/login`;
export const API_PATH_AUTH_REFRESH_TOKEN = `${API_PATH_AUTH}/refresh-token`;
