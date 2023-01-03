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
   * @description Add something.
   */
  public async addSomething(input: SomethingInput) {
    const { something } = input;
    const key = 'SOMEKEY';

    const params = {
      ExpressionAttributeValues: {
        ':p': { N: '1' },
        ':start_value': { N: '0' }
      },
      UpdateExpression: 'SET p = if_not_exists(p, :start_value) + :p'
    };

    await this.updateItem(key, something, params);
  }

  /**
   * PRIVATE METHODS
   */

  /**
   * @description Get data from DynamoDB.
   */
  private async getItem(repoName: string): Promise<DynamoItems> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': { S: `METRICS_${repoName}` }
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
    chf: { N: '67' },
    rt: { N: '5313' },
    d: { N: '50' },
    ad: { N: '67' },
    pt: { N: '1413' },
    cl: { N: '33' },
    cm: { N: '40' },
    m: { N: '29' },
    chr: { N: '60' },
    o: { N: '58' },
    p: { N: '23' },
    ap: { N: '22' },
    sk: { S: '20221115' },
    pk: { S: 'METRICS_SOMEORG/SOMEREPO' }
  }
];
