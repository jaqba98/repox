import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain.model";
import {
  GetParamDependenceService
} from "../service/get-param-dependence.service";
import {
  BuildParamDomainValidationService
} from "../builder/build-param-domain-validation.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDependencyCommandModel,
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { ProgramEnum } from "../../enum/program.enum";

@singleton()
/**
 * The validator is responsible for checking that
 * the given command exist.
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
    paramDep: ParamDependencyModel,
    command: ParamDependencyCommandModel
  ): ParamDomainValidationModel {
    if (!command) {
      return this.buildParam.paramDomainValidationError(
        [],
        ["You have specified not existed command for given program!"],
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
// todo: fix it