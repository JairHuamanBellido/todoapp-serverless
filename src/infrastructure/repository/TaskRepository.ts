import { DynamoDB } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { DynamoDBDITokens } from '../../core/di/DynamoDBDITokens';
import { Task } from '../../domain/model/Task';
import { DynamoDBConnection } from '../database/DynamoDBConnection';
import { TaskRepositoryMapper } from '../mapper/TaskRepositoryMapper';
import { TaskDynamoDB } from '../model/TaskDynamoDB.model';
import { ITaskRepository } from './ITaskRepository.interface';

@injectable()
export class TaskRepository implements ITaskRepository {
  private readonly tableName: string = 'todo';
  constructor(
    @inject(DynamoDBDITokens.DynamoDBConnection)
    private readonly dynamoDB: DynamoDBConnection
  ) {}

  async getAll(): Promise<Task[]> {
    const dynamoTask: TaskDynamoDB[] = (await (
      await this.dynamoDB.connection
        .scan({
          TableName: this.tableName,
        })
        .promise()
    ).Items) as unknown as TaskDynamoDB[];

    return TaskRepositoryMapper.toDomainEntites(dynamoTask);
  }

  async create(task: TaskDynamoDB): Promise<void> {
    await this.dynamoDB.connection
      .put({
        TableName: this.tableName,
        Item: task,
      })
      .promise();
  }
}
