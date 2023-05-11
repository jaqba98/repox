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
import { CommandEnum } from "../../enum/command.enum";

@singleton()
/**
 * The validator is responsible for checking
 * that given program exist.
 */
export class CommandExistValidatorService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    if (paramDomain.command.name === CommandEnum.unknown) {
      return this.buildParamDomain.buildError(
        [paramDomain.command.index],
        ["You have specified not existed program!"],
        [
          "You have to specify correct program name.",
          "Check the documentation to get full list of commands."
        ],
        paramDomain
      );
    }
    return this.buildParamDomain.buildSuccess(paramDomain);
  }
}
