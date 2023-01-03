import { Dependencies } from '../interfaces/Dependencies';
import { SomethingInput } from '../interfaces/Something';

import { MissingRepositoryError } from '../application/errors';

export async function AddSomethingUsecase(
  dependencies: Dependencies,
  input: SomethingInput
): Promise<'OK'> {
  if (!dependencies.repository) throw new MissingRepositoryError();
  await dependencies.repository.addSomething(input);
  return 'OK';
}
