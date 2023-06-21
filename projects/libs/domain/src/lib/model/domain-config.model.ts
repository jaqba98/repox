import { RepoxDomainModel } from "./repox-domain.model";
import { TsconfigDomainModel } from "./tsconfig-domain.model";

/**
 * The model contains the entire domain model.
 */
export interface DomainConfigModel {
  repoxDomain: RepoxDomainModel;
  tsconfigDomain: TsconfigDomainModel;
}
// todo: refactor
