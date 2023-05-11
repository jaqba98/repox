import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../parameter/src/model/validator/validator-domain.model";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainModel
} from "../../parameter/src/model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../parameter/src/model/param-domain/param-domain-validation.model";
import { CommandEnum } from "../../parameter/src/enum/command.enum";

/**
 * The validator is responsible for checking
 * that given command exist.
 */
@singleton()
export class CommandExistValidator implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    if (paramDomain.command.name === CommandEnum.unknown) {
      return this.buildParamDomain.buildError(
        [paramDomain.command.index],
        ["You have specified not existed command!"],
        [
          "You have to specify correct command name.",
          "Check the documentation to get full list of commands."
        ],
        paramDomain
      );
    }
    return this.buildParamDomain.buildSuccess(paramDomain);
  }
}
