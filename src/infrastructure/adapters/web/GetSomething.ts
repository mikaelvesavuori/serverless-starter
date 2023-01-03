import { Context } from 'aws-lambda';
import { MikroLog } from 'mikrolog';

import { GetSomethingUsecase } from '../../../usecases/GetSomethingUsecase';

import { makeRequestDTO } from '../../../application/makeInputDTO';

import { EventInput } from '../../../interfaces/Lambda';

import { end } from '../../frameworks/end';
import { getRepo } from '../../frameworks/getRepo';

import { metadataConfig } from '../../config/config';

/**
 * @description This handles getting something.
 */
export async function handler(event: EventInput, context: Context) {
  const logger = MikroLog.start({ metadataConfig, event, context });

  try {
    const repository = getRepo(process.env.NODE_ENV === 'test');
    const inputDto = makeRequestDTO(event.queryStringParameters);

    const response = await GetSomethingUsecase({ repository }, inputDto);

    return end(200, response);
  } catch (error: any) {
    const statusCode: number = error?.['cause']?.['statusCode'] || 400;
    const message: string = error.message;
    logger.error(message);
    return end(statusCode, message);
  }
}
