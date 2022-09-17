import { Task } from '../../domain/model/Task';
import { TaskDynamoDB } from '../model/TaskDynamoDB.model';

export class TaskRepositoryMapper {
  public static toDomainEntity(taskDynamoDb: TaskDynamoDB): Task {
    return {
      id: taskDynamoDb.id,
      title: taskDynamoDb.title,
      done: taskDynamoDb.done,
    };
  }

  public static toDomainEntites(tasksDynamoDB: TaskDynamoDB[]): Task[] {
    return tasksDynamoDB.map((task) => this.toDomainEntity(task));
  }

  public static toRepositoryEntity(task: Task): TaskDynamoDB {
    return {
      done: task.done,
      id: task.id,
      title: task.title,
    };
  }

  public static toRepositoryEntities(tasks: Task[]): TaskDynamoDB[] {
    return tasks.map((task) => this.toRepositoryEntity(task));
  }
}
