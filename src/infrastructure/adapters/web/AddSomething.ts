import { Context } from 'aws-lambda';
import { MikroLog } from 'mikrolog';

import { AddSomethingUsecase } from '../../../usecases/AddSomethingUsecase';

import { makeInputDTO } from '../../../application/makeDTO';

import { EventInput } from '../../../interfaces/Lambda';

import { end } from '../../frameworks/end';
import { getRepo } from '../../frameworks/getRepo';

import { metadataConfig } from '../../config/config';

/**
 * @description This handles adding something.
 */
export async function handler(event: EventInput, context: Context) {
  const logger = MikroLog.start({ metadataConfig, event, context });

  try {
    const body: Record<string, any> =
      event.body && typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const repository = getRepo(process.env.NODE_ENV === 'test');
    const inputDto = makeInputDTO(body);

    const response = await AddSomethingUsecase({ repository }, inputDto);
    return end(201, response);
  } catch (error: any) {
    const statusCode: number = error?.['cause']?.['statusCode'] || 400;
    const message: string = error.message;
    logger.error(message);
    return end(statusCode, message);
  }
}
