import { singleton } from "tsyringe";
import {
  BuildParamDomainValidationService
} from "../builder/build-param-domain-validation.service";
import {
  GetParamDependenceService
} from "../service/get-param-dependence.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain.model";
import {
  ParamDependencyCommandModel,
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";

@singleton()
/**
 * The validator is responsible for checking that
 * the given DTO parameters are in correct order.
 */
export class CommandExistValidatorService
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependence: GetParamDependenceService,
    private readonly buildParam: BuildParamDomainValidationService
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
    program: ParamDependencyModel | undefined,
    command: ParamDependencyCommandModel | undefined
  ): ParamDomainValidationModel {
    if (!command) {
      return this.buildParam.paramDomainValidationError(
        [],
        ["You have specified not exist command for given program!"],
        [
          "You have to specify correct command name.",
          "Check the documentation to get full list of commands."
        ],
        paramDomain
      );
    }
    return this.buildParam.paramDomainValidationSuccess(paramDomain);
  }
}
// todo: refactor