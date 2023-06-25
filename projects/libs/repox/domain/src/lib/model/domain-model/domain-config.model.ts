import { RepoxDtoModel } from "../dto-model/repox-dto.model";
import {
  TsconfigDtoModel
} from "../dto-model/tsconfig-dto.model";

/**
 * The model contains the entire domain model.
 */
export interface DomainConfigModel {
  repoxDomain: RepoxDtoModel;
  tsconfigDomain: TsconfigDtoModel;
}
// todo: refactor
