import 'reflect-metadata';
import { APIGatewayEvent } from 'aws-lambda';
import { CreateTaskDTO } from '../domain/dto/CreateTaskDTO';
import { CreateTaskProvider } from '../core/provider/TaskProvider';

export const handler = async (event: APIGatewayEvent) => {
  const newTask = JSON.parse(event.body as string) as CreateTaskDTO;

  return {
    statusCode: 201,
    body: JSON.stringify(await CreateTaskProvider.execute(newTask)),
  };
};
