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

  async update(task: TaskDynamoDB): Promise<boolean> {
    const isTaskExist = await this.getById(task.id);

    if (!isTaskExist) {
      return false;
    }
    return !!(await this.dynamoDB.connection
      .update({
        TableName: this.tableName,
        Key: {
          id: task.id,
        },
        AttributeUpdates: {
          title: { Value: task.title },
          done: { Value: task.done },
        },
      })
      .promise());
  }

  async getById(id: string): Promise<Task | undefined> {
    const task = await (
      await this.dynamoDB.connection
        .get({
          TableName: this.tableName,
          Key: { id: id },
        })
        .promise()
    ).Item;

    return (
      TaskRepositoryMapper.toDomainEntity(task as TaskDynamoDB) || undefined
    );
  }

  async delete(taskId: string): Promise<boolean> {
    const isTaskExist = await this.getById(taskId);
    if (!isTaskExist) {
      return false;
    }
    return !!(await this.dynamoDB.connection
      .delete({
        TableName: this.tableName,
        Key: {
          id: taskId,
        },
      })
      .promise());
  }
}
