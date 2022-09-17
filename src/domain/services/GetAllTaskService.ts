import { inject, injectable } from 'inversify';
import { TaskDITokens } from '../../core/di/TaskDITokens';
import { ITaskRepository } from '../../infrastructure/repository/ITaskRepository.interface';

@injectable()
export class GetAllTaskService {
  constructor(
    @inject(TaskDITokens.ITaskRepository)
    private readonly repository: ITaskRepository
  ) {}

  public async execute() {
    return await this.repository.getAll();
  }
}
