import { inject, injectable } from 'inversify';
import { TaskDITokens } from '../../core/di/TaskDITokens';
import { ITaskRepository } from '../../infrastructure/repository/ITaskRepository.interface';

@injectable()
export class DeleteTaskService {
  constructor(
    @inject(TaskDITokens.ITaskRepository)
    private readonly repository: ITaskRepository
  ) {}

  public async execute(taskId: string) {
    const isDeleted = await this.repository.delete(taskId);

    return {
      message: isDeleted ? 'Task Deleted' : 'Not Found',
    };
  }
}
