import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain-model";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation-model";
import { Command } from "../../enum/command";

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
    if (paramDomain.command.name === Command.unknown) {
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
