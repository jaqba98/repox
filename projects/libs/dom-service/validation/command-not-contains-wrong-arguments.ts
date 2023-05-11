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
import { GetParamDependency } from "../service/get-param-dependency";
import {
  ParamDependencyModel
} from "../../parameter/src/model/param-domain/param-dependency.model";
import { ProgramEnum } from "../../parameter/src/enum/program.enum";
import { CommandEnum } from "../../parameter/src/enum/command.enum";

/**
 * The validator is responsible for checking that the given command
 * does not contain wrong arguments.
 */
@singleton()
export class CommandNotContainsWrongArguments
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependency,
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
  ): ParamDomainValidationModel {
    const programName: ProgramEnum = paramDomain.program.name;
    const commandName: CommandEnum = paramDomain.command.name;
    const programDep: ParamDependencyModel = this.getParamDependency
      .getDependency(programName);
    const command = programDep.commands[commandName];
    const commandArgs = Object.values(command.args);
    const wrongArgs = paramDomain.command.args
      .filter(arg =>
        !commandArgs.find(commandArg => commandArg.name === arg.name)
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    const notExistedArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["You have specified not existed arguments for command!"],
      [
        `Not existed arguments for command: ${notExistedArgs}`
      ],
      paramDomain
    );
  }
}
