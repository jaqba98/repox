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
  CheckArgumentService
} from "../service/check-argument.service";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import { BaseGetParamDependencyModel } from "@lib/model";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * arguments have correct value.
 */
export class ValidatorCommandArgIsCorrectValueService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly checkArgument: CheckArgumentService,
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
    const commandArgs = programDep.commands[commandName].args;
    const wrongArgs = paramDomain.command.args
      .filter(arg => arg.name !== "unknown")
      .map(arg => this.checkArgument.argumentValue(arg, commandArgs))
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
