import { CleanedItem } from '../../interfaces/Item';
import { Repository } from '../../interfaces/Repository';
import { SomethingInput, SomethingRequest } from '../../interfaces/Something';

import TestDatabase from '../../../testdata/TestDatabase.json';

/**
 * @description Factory function for creating an instance of a local repository.
 */
export function createNewLocalRepository(): LocalRepository {
  return new LocalRepository();
}

/**
 * @description The local repo acts as a simple mock for testing and similar purposes.
 */
class LocalRepository implements Repository {
  public async getSomething(input: SomethingRequest): Promise<CleanedItem[]> {
    const { key } = input;
    return TestDatabase.filter((item: any) => {
      if (key === item.key) return item;
    }) as unknown as CleanedItem[];
  }

  public async addSomething(input: SomethingInput): Promise<void> {
    console.log(input);
  }
}
