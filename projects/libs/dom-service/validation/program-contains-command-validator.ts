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
import { GetParamDependency } from "../service/get-param-dependency";
import { ProgramEnum } from "../../parameter/src/enum/program.enum";
import {
  ParamDependencyModel
} from "../../parameter/src/model/param-domain/param-dependency.model";

/**
 * The validator is responsible for checking
 * that given command contain given command.
 */
@singleton()
export class ProgramContainsCommandValidator
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependency,
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel
  ): ParamDomainValidationModel {
    const programName: ProgramEnum = paramDomain.program.name;
    const commandName: CommandEnum = paramDomain.command.name;
    const programDep: ParamDependencyModel = this.getParamDependency
      .getDependency(programName);
    if (programDep.commands[commandName]) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    return this.buildParamDomain.buildError(
      [paramDomain.command.index],
      ["The given command is not supported by the given command!"],
      [
        "You have to specify supported command name.",
        "Check the documentation to get full list of commands."
      ],
      paramDomain
    );
  }
}
