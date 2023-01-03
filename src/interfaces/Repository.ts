import { CleanedItem } from './Item';
import { SomethingInput, SomethingRequest } from './Something';

/**
 * @description Describes what a repository (database implementation)
 * has to conform to.
 */
export interface Repository {
  /**
   * @description Get metrics for a given repository and a period of time.
   */
  getSomething(input: SomethingRequest): Promise<CleanedItem[]>;

  /**
   * @description TODO
   */
  addSomething(input: SomethingInput): Promise<void>;
}
