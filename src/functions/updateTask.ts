import {
  APIGatewayEvent,
  APIGatewayProxyEventPathParameters,
} from 'aws-lambda';
import 'reflect-metadata';
import { UpdateTaskProvider } from '../core/provider/TaskProvider';
import { Task } from '../domain/model/Task';
export const handler = async (event: APIGatewayEvent) => {
  try {
    const id = (event.pathParameters as APIGatewayProxyEventPathParameters)
      .id as string;

    const body = JSON.parse(event.body as string) as Omit<Task, 'id'>;
    return {
      statusCode: 200,
      body: JSON.stringify(await UpdateTaskProvider.execute(id, body)),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Something went wrong!' }),
    };
  }
};
