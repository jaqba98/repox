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
import { GetParamDependency } from "../service/get-param-dependency";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency-model";
import { Command } from "../../enum/command";
import { Program } from "../../enum/program";

/**
 * The validator is responsible for checking that the given command
 * contains all required arguments.
 */
@singleton()
export class CommandContainsArguments
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependency,
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
  ): ParamDomainValidationModel {
    const programName: Program = paramDomain.program.name;
    const commandName: Command = paramDomain.command.name;
    const programDep: ParamDependencyModel = this.getParamDependency
      .getDependency(programName);
    const command = programDep.commands[commandName];
    const commandArgs = command.args;
    const wrongArgs = Object.values(commandArgs)
      .filter(commandArg => commandArg.required)
      .filter(commandArg => !paramDomain.command.args
        .find(arg => arg.name === commandArg.name)
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    const missingArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [],
      ["You have not specified all required arguments for command!"],
      [
        "You have to specify required arguments.",
        `Missing arguments for command are: ${missingArgs}`
      ],
      paramDomain
    );
  }
}
