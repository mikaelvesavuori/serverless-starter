import { SomethingInput, SomethingRequest } from '../interfaces/Something';

/**
 * @description TODO
 */
export function makeInputDTO(body: Record<string, any>): SomethingInput {
  if (!body['something']) throw new Error('TODO');

  return {
    something: body['something']
  };
}

/**
 * @description TODO
 */
export function makeRequestDTO(queryStringParams: Record<string, any>): SomethingRequest {
  if (!queryStringParams['key']) throw new Error('TODO');

  return {
    key: queryStringParams['key']
  };
}
