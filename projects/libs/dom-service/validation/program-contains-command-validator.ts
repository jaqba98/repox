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
import { GetParamDependency } from "../service/get-param-dependency";
import { Program } from "../../enum/program";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency-model";

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
    const programName: Program = paramDomain.program.name;
    const commandName: Command = paramDomain.command.name;
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
