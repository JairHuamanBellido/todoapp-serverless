import { Task } from '../../domain/model/Task';
import { TaskDynamoDB } from '../model/TaskDynamoDB.model';

export interface ITaskRepository {
  getAll(): Promise<Array<Task>>;
  create(task: TaskDynamoDB): Promise<void>;
  update(task: TaskDynamoDB): Promise<boolean>;
  delete(taskId: string): Promise<boolean>;
}
