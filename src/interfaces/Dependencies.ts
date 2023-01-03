import { Repository } from './Repository';

/**
 * @description Type abstraction for any use-case dependencies.
 */
export type Dependencies = {
  repository: Repository;
};
