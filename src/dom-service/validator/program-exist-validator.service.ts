import { singleton } from "tsyringe";
import { ProgramEnum } from "../../enum/program.enum";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain.model";
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

@singleton()
/**
 * The validator is responsible for checking that
 * the program exist.
 */
export class ProgramExistValidatorService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParam: BuildParamDomainValidationService
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
    paramDep: ParamDependencyModel,
    command: ParamDependencyCommandModel
  ): ParamDomainValidationModel {
    if (paramDep.program === ProgramEnum.unknown) {
      return this.buildParam.paramDomainValidationError(
        [paramDomain.program.index],
        ["You have specified not existed program!"],
        [
          "You have to specify correct program name.",
          "Check the documentation to get full list of programs."
        ],
        paramDomain
      );
    }
    return this.buildParam.paramDomainValidationSuccess(paramDomain);
  }
}
