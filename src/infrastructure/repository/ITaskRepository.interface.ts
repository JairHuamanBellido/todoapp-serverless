import { Task } from '../../domain/model/Task';

export interface ITaskRepository {
  getAll(): Promise<Array<Task>>;
}
