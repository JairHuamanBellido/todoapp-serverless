import { Container } from 'inversify';
import { DynamoDBConnection } from '../../infrastructure/database/DynamoDBConnection';
import { ITaskRepository } from '../../infrastructure/repository/ITaskRepository.interface';
import { TaskRepository } from '../../infrastructure/repository/TaskRepository';
import { DynamoDBDITokens } from '../di/DynamoDBDITokens';
import { TaskDITokens } from '../di/TaskDITokens';

const container = new Container();

container
  .bind<ITaskRepository>(TaskDITokens.ITaskRepository)
  .to(TaskRepository);

container
  .bind<DynamoDBConnection>(DynamoDBDITokens.DynamoDBConnection)
  .to(DynamoDBConnection)
  .inSingletonScope();

export { container };
