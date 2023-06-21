import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  GetParamDependencyService
} from "../service/get-param-dependency.service";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { ArgumentEnum } from "../../enum/argument.enum";
import {
  CheckArgumentService
} from "../service/check-argument.service";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * arguments are correct.
 */
export class ValidatorCommandArgumentsCorrectService
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependencyService,
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly checkArgument: CheckArgumentService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator(): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    const programName: ProgramEnum = paramDomain.program.name;
    const commandName: CommandEnum = paramDomain.command.name;
    const programDep: ParamDependencyModel = this.getParamDependency
      .getDependency(programName);
    const commandArgs = programDep.commands[commandName].args;
    const wrongArgs = paramDomain.command.args
      .filter(arg => arg.name !== ArgumentEnum.unknown)
      .map(arg => this.checkArgument.valueMode(arg, commandArgs))
      .filter(arg => !arg.success);
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      [...wrongArgs.map(arg => arg.error)],
      [
        "Check the documentation to get full list of arguments."
      ]
    );
  }
}
// todo: refactor
