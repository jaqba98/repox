import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { ProgramEnum } from "../../enum/program.enum";

@singleton()
/**
 * The validator is responsible for checking
 * that given command exist.
 */
export class ProgramExistValidatorService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    if (paramDomain.program.name === ProgramEnum.unknown) {
      return this.buildParamDomain.buildError(
        [paramDomain.program.index],
        ["You have specified not existed command!"],
        [
          "You have to specify correct command name.",
          "Check the documentation to get full list of programs."
        ],
        paramDomain
      );
    }
    return this.buildParamDomain.buildSuccess(paramDomain);
  }
}
