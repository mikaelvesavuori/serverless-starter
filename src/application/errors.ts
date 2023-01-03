/**
 * @description Used when an incorrect authorization token is used.
 */
export class InvalidAuthTokenError extends Error {
  constructor() {
    super();
    this.name = 'InvalidAuthTokenError';
    const message = `The provided authorization token is incorrect.`;
    this.message = message;
    this.cause = {
      statusCode: 400
    };
  }
}

/**
 * @description Used when an expected `authorization` query string parameter is missing.
 */
export class MissingAuthorizationQueryStringParameterError extends Error {
  constructor() {
    super();
    this.name = 'MissingAuthorizationQueryStringParameterError';
    const message = `Missing an expected value in the "authorization" query string parameter!`;
    this.message = message;
    this.cause = {
      statusCode: 400
    };
  }
}

/**
 * @description Used when a usecase is called without a repository.
 */
export class MissingRepositoryError extends Error {
  constructor() {
    super();
    this.name = 'MissingRepositoryError';
    const message = `Missing repository in usecase!`;
    this.message = message;
    this.cause = {
      statusCode: 500
    };
  }
}

/**
 * @description Missing required environment variables when setting up DynamoDB.
 */
export class MissingEnvironmentVariablesDynamoError extends Error {
  constructor() {
    super();
    this.name = 'MissingEnvironmentVariablesDynamoError';
    const message = `Missing required environment variables in DynamoDB!`;
    this.message = message;
    this.cause = {
      statusCode: 500
    };
  }
}

/**
 * @description Used when an input/request DTO is missing required fields.
 */
export class MissingRequiredInputError extends Error {
  constructor() {
    super();
    this.name = 'MissingRequiredInputError';
    const message = `Missing required fields in input!`;
    this.message = message;
    this.cause = {
      statusCode: 500
    };
  }
}
