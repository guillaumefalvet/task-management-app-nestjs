import { TaskStatus } from './task-status';

describe('TaskStatus', () => {
  it('should have the correct values', () => {
    expect(TaskStatus.OPEN).toBe('OPEN');
    expect(TaskStatus.IN_PROGRESS).toBe('IN_PROGRESS');
    expect(TaskStatus.DONE).toBe('DONE');
  });
});
