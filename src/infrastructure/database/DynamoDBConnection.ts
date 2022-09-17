import { DynamoDB } from 'aws-sdk';
import { injectable } from 'inversify';

@injectable()
export class DynamoDBConnection {
  public connection: DynamoDB.DocumentClient;

  constructor() {
    this.connection = new DynamoDB.DocumentClient({
      apiVersion: '2012-08-10',
      region: 'us-east-2',
    });
  }
}
