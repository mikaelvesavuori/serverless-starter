import test from 'ava';

import { GetSomethingUsecase } from '../../../src/usecases/GetSomethingUsecase';

import { createNewLocalRepository } from '../../../src/infrastructure/repositories/LocalRepository';

test.serial('It should get items with a given key', async (t) => {
  const expected: any = [
    {
      key: 'something'
    },
    {
      key: 'something'
    },
    {
      key: 'something'
    },
    {
      key: 'something'
    }
  ];
  const repository = createNewLocalRepository();
  const input = {
    key: 'something'
  };

  const response = await GetSomethingUsecase({ repository }, input);

  t.deepEqual(response, expected);
});

/**
 * NEGATIVE TESTS
 */

test.serial('It should throw a MissingRepositoryError if missing a repository', async (t) => {
  const expected = 'MissingRepositoryError';

  // @ts-ignore
  const error: any = await t.throwsAsync(async () => await GetSomethingUsecase({}));

  t.is(error.name, expected);
});
