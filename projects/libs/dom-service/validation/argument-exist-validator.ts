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
import { ArgumentEnum } from "../../parameter/src/enum/argument.enum";

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
      .filter(arg => arg.name === ArgumentEnum.unknown);
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
