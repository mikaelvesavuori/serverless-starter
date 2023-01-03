import { SomethingInput, SomethingRequest } from '../interfaces/Something';
import { MissingRequiredInputError } from './errors';

/**
 * @description Create a valid input DTO.
 */
export function makeInputDTO(body: Record<string, any>): SomethingInput {
  if (!body['something']) throw new MissingRequiredInputError();

  return {
    something: body['something']
  };
}

/**
 * @description Create a valid request DTO.
 */
export function makeRequestDTO(queryStringParams: Record<string, any>): SomethingRequest {
  if (!queryStringParams['key']) throw new MissingRequiredInputError();

  return {
    key: queryStringParams['key']
  };
}
