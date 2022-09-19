import {
  APIGatewayEvent,
  APIGatewayProxyEventPathParameters,
} from 'aws-lambda';
import 'reflect-metadata';
import { DeleteTaskProvider } from '../core/provider/TaskProvider';

export const handler = async (event: APIGatewayEvent) => {
  try {
    const id = (event.pathParameters as APIGatewayProxyEventPathParameters)
      .id as string;

    return {
      statusCode: 200,
      body: JSON.stringify(await DeleteTaskProvider.execute(id)),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
