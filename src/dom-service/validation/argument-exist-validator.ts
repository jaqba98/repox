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
import { Argument } from "../../enum/argument";

/**
 * The validator is responsible for checking that
 * the given arguments exist.
 */
@singleton()
export class ArgumentExistValidator implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
  ): ParamDomainValidationModel {
    const programArgs = paramDomain.program.args;
    const commandArgs = paramDomain.command.args;
    const args = [...programArgs, ...commandArgs];
    const wrongArgs = args
      .filter(arg => arg.name === Argument.unknown);
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["You have specified not existed arguments!"],
      [
        "You have to specify correct arguments.",
        "Check the documentation to get full list of arguments."
      ],
      paramDomain
    );
  }
}
