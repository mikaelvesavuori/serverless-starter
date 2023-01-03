/**
 * @description The Dynamo item that is to be destructured.
 */
export type Entry = [key: string, value: StringRepresentation];

/**
 * @description Representation of records in the database.
 */
export type DynamoItems = {
  Items: DynamoItem[];
};

/**
 * @description Record in the database.
 */
export type DynamoItem = {
  [key: string]: StringRepresentation;
};

/**
 * @description String that represents the value.
 */
export type StringRepresentation = {
  S: string;
};
