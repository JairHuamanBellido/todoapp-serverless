import { inject, injectable } from 'inversify';
import { TaskDITokens } from '../../core/di/TaskDITokens';
import { TaskRepositoryMapper } from '../../infrastructure/mapper/TaskRepositoryMapper';
import { ITaskRepository } from '../../infrastructure/repository/ITaskRepository.interface';
import { Task } from '../model/Task';

@injectable()
export class UpdateTaskService {
  constructor(
    @inject(TaskDITokens.ITaskRepository)
    private readonly repository: ITaskRepository
  ) {}

  public async execute(taskId: string, partialTask: Omit<Task, 'id'>) {
    const task: Task = {
      id: taskId,
      ...partialTask,
    };

    const isUpdated = await this.repository.update(
      TaskRepositoryMapper.toRepositoryEntity(task)
    );

    return { message: isUpdated ? 'Task Updated' : 'Not Found' };
  }
}
