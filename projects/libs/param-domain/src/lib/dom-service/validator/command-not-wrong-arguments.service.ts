import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ParamDomainDepModel
} from "../../model/param-domain/param-domain-dep.model";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import { BaseGetParamDependencyModel } from "@lib/model";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * does not contain wrong arguments.
 */
export class CommandNotWrongArgumentsService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator(
    getParamDependency: BaseGetParamDependencyModel
  ): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    const programName = paramDomain.program.name;
    const commandName = paramDomain.command.name;
    const programDep: ParamDomainDepModel = getParamDependency
      .getDependency(programName);
    const command = programDep.commands[commandName];
    const commandArgs = Object.values(command.args);
    const wrongArgs = paramDomain.command.args.filter(arg =>
      !commandArgs.find(commandArg => commandArg.name === arg.name)
    );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    const notExistedArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["You have specified not existed arguments for command!"],
      [
        `Not existed arguments for command: ${notExistedArgs}`
      ]
    );
  }
}
