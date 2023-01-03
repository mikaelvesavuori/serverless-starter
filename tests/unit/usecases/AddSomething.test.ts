import test from 'ava';

import { AddSomethingUsecase } from '../../../src/usecases/AddSomethingUsecase';

import { createNewLocalRepository } from '../../../src/infrastructure/repositories/LocalRepository';

test.serial('It should add an item', async (t) => {
  const expected = 'OK';
  const repository = createNewLocalRepository();
  const input = {
    something: 'something'
  };

  const response = await AddSomethingUsecase({ repository }, input);

  t.is(response, expected);
});

/**
 * NEGATIVE TESTS
 */

test.serial('It should throw a MissingRepositoryError if missing a repository', async (t) => {
  const expected = 'MissingRepositoryError';

  // @ts-ignore
  const error: any = await t.throwsAsync(async () => await AddSomethingUsecase({}));

  t.is(error.name, expected);
});
