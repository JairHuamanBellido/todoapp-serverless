import { APIGatewayAuthorizerEvent } from 'aws-lambda';
import 'reflect-metadata';
import { GetAllTaskProvider } from '../core/provider/TaskProvider';
export const handler = async (event: APIGatewayAuthorizerEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify([...(await GetAllTaskProvider.execute())]),
  };
};
