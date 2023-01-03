/**
 * @description Simplified representation of AWS Lambda `event` object.
 */
export type EventInput = {
  body: Record<string, any>;
  headers: Headers;
  httpMethod: HttpMethod;
  queryStringParameters: QueryStringParameters;
  methodArn: string;
  resource: string;
};

/**
 * @description Supported HTTP methods.
 */
export type HttpMethod = 'GET' | 'POST' | 'OPTIONS';

/**
 * @description Simplified headers object.
 */
export type Headers = {
  Authorization: string;
};

/**
 * @description Simplified query string parameters object.
 */
export type QueryStringParameters = {
  [key: string]: string;
};
