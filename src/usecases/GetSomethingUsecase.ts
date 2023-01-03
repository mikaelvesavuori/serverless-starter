import { Dependencies } from '../interfaces/Dependencies';
import { SomethingRequest } from '../interfaces/Something';

import { MissingRepositoryError } from '../application/errors';

export async function GetSomethingUsecase(dependencies: Dependencies, input: SomethingRequest) {
  if (!dependencies.repository) throw new MissingRepositoryError();
  return await dependencies.repository.getSomething(input);
}
