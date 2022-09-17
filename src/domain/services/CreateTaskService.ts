import { inject, injectable } from 'inversify';
import { TaskDITokens } from '../../core/di/TaskDITokens';
import { ITaskRepository } from '../../infrastructure/repository/ITaskRepository.interface';
import { CreateTaskDTO } from '../dto/CreateTaskDTO';
import { Task } from '../model/Task';
import { v4 as uuidv4 } from 'uuid';
import { TaskRepositoryMapper } from '../../infrastructure/mapper/TaskRepositoryMapper';

@injectable()
export class CreateTaskService {
  constructor(
    @inject(TaskDITokens.ITaskRepository)
    private readonly repository: ITaskRepository
  ) {}

  public async execute(newTask: CreateTaskDTO) {
    const task: Task = {
      id: uuidv4(),
      done: false,
      title: newTask.title,
    };
    await this.repository.create(TaskRepositoryMapper.toRepositoryEntity(task));

    return { message: 'Task created!' };
  }
}
