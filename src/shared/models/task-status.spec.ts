import { TaskStatusEnum } from './task-status';

describe('TaskStatus', () => {
  it('should have the correct values', () => {
    expect(TaskStatusEnum.OPEN).toBe('OPEN');
    expect(TaskStatusEnum.IN_PROGRESS).toBe('IN_PROGRESS');
    expect(TaskStatusEnum.DONE).toBe('DONE');
  });
});
