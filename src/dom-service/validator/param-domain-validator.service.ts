import { singleton } from "tsyringe";
import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "../../model/domain/param-domain.model";

@singleton()
export class ParamDomainValidatorService {
  verify(
    paramDomain: ParamDomainModel
  ): ParamsDomainValidatorModel | true {
    return true;
  }
}
