import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain-model";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation-model";
import { GetParamDependency } from "../service/get-param-dependency";
import {
  ParamDependencyArgsModel,
  ParamDependencyModel
} from "../../model/param-domain/param-dependency-model";
import { Program } from "../../enum/program";
import { Command } from "../../enum/command";
import { Argument } from "../../enum/argument";

/**
 * The validator is responsible for checking that the given command
 * arguments are correct.
 */
@singleton()
export class CommandArgumentsCorrect
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
    const commandArgs = programDep.commands[commandName].args;
    const wrongArgs = paramDomain.command.args
      .filter(arg => arg.name !== Argument.unknown)
      .filter(arg => !this.checkCommandArgs(arg, commandArgs));
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["Given arguments have not correct values!"],
      [
        "Check the documentation to get full list of arguments."
      ],
      paramDomain
    );
  }

  private checkCommandArgs(
    commandArg: ParamDomainArgumentModel,
    commandArgs: ParamDependencyArgsModel
  ): boolean {
    const depArg = commandArgs[commandArg.name];
    if (depArg.valueMode === "empty") {
      return commandArg.values.length === 0;
    }
    if (depArg.valueMode === "single") {
      return commandArg.values.length === 1;
    }
    return commandArg.values.length > 1;
  }
}
