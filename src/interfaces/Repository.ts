import { CleanedItem } from './Item';
import { SomethingInput, SomethingRequest } from './Something';

/**
 * @description Describes what a repository (database implementation)
 * has to conform to.
 */
export interface Repository {
  /**
   * @description Get something.
   */
  getSomething(input: SomethingRequest): Promise<CleanedItem[]>;

  /**
   * @description Add something.
   */
  addSomething(input: SomethingInput): Promise<void>;
}
