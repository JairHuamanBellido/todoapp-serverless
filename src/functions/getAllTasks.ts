import 'reflect-metadata';
import { GetAllTaskProvider } from '../core/provider/TaskProvider';
export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify([...(await GetAllTaskProvider.execute())]),
  };
};
