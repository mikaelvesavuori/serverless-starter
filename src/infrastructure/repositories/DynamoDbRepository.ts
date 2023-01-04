import { DynamoDBClient, UpdateItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

import { CleanedItem } from '../../interfaces/Item';
import { DynamoItems } from '../../interfaces/DynamoDb';
import { SomethingInput } from '../../interfaces/Something';
import { Repository } from '../../interfaces/Repository';

import { getCleanedItems } from '../frameworks/getCleanedItems';

import { MissingEnvironmentVariablesDynamoError } from '../../application/errors';
import { SomethingRequest } from '../../interfaces/Something';

/**
 * @description Factory function to create a DynamoDB repository.
 */
export function createNewDynamoRepository() {
  return new DynamoDbRepository();
}

/**
 * @description Concrete implementation of DynamoDB repository.
 * @see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html
 */
export class DynamoDbRepository implements Repository {
  readonly dynamoDb: DynamoDBClient;
  readonly tableName: string;
  readonly region: string;

  constructor() {
    const REGION = process.env.REGION;
    const TABLE_NAME = process.env.TABLE_NAME;
    if (!REGION || !TABLE_NAME) throw new MissingEnvironmentVariablesDynamoError();

    this.tableName = TABLE_NAME;
    this.region = REGION;
    this.dynamoDb = new DynamoDBClient({ region: this.region });
  }

  /**
   * @description Get something.
   */
  public async getSomething(input: SomethingRequest): Promise<CleanedItem[]> {
    const { key } = input;
    const data = await this.getItem(key);

    const items = data?.Items || '';

    return getCleanedItems(items);
  }

  /**
   * @description Add something. Sets a timestamp as the sort key.
   */
  public async addSomething(input: SomethingInput) {
    const { something } = input;

    const params = {
      TableName: this.tableName,
      Item: {
        pk: { S: something },
        sk: { S: `${Math.floor(Date.now() / 1000)}` }
      }
    };

    await this.updateItem(something, something, params);
  }

  /**
   * PRIVATE METHODS
   */

  /**
   * @description Get data from DynamoDB.
   */
  private async getItem(key: string): Promise<DynamoItems> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk AND sk > :sk',
      ExpressionAttributeValues: {
        ':pk': { S: key },
        ':sk': { S: '1' }
      }
    };

    // @ts-ignore
    return process.env.NODE_ENV !== 'test'
      ? await this.dynamoDb.send(new QueryCommand(params))
      : { Items: testDataItem };
  }

  /**
   * @description Updates an item in the DynamoDB table.
   */
  private async updateItem(
    repoName: string,
    date: string,
    parameters: Record<string, any>
  ): Promise<void> {
    const key = `METRICS_${repoName}`;

    const params = {
      ...parameters,
      Key: {
        pk: { S: key },
        sk: { S: date }
      },
      TableName: this.tableName
    };

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') await this.dynamoDb.send(new UpdateItemCommand(params));
  }
}

/**
 * @description Dummy data for testing purposes.
 */
const testDataItem = [
  {
    pk: { S: 'some-item' },
    sk: { S: '1672822070' }
  }
];
