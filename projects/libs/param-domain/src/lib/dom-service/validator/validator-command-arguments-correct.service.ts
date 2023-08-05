import { singleton } from "tsyringe";
import {
  type ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  CheckArgumentService
} from "../service/check-argument.service";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import { type BaseGetParamDepModel } from "@lib/model";
import {
  type ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { type ParamDomainDepModel } from "@lib/param-domain";
import { BaseParamTypeEnum } from "../../enum/base-param-type.enum";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * arguments are correct.
 */
export class ValidatorCommandArgumentsCorrectService
implements ValidatorDomainModel {
  constructor (
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly checkArgument: CheckArgumentService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator (
    getParamDepService: BaseGetParamDepModel
  ): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    const programName = paramDomain.program.name;
    const commandName = paramDomain.command.name;
    const programDep: ParamDomainDepModel = getParamDepService
      .getDependency(programName);
    const commandArgs = programDep.commands[commandName].args;
    const wrongArgs = paramDomain.command.args
      .filter(arg => arg.name !== BaseParamTypeEnum.unknown)
      .map(arg => this.checkArgument.valueMode(arg, commandArgs))
      .filter(arg => !arg.success);
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      [...wrongArgs.map(arg => arg.error)],
      [
        `Check the documentation to get full list of arguments.`
      ]
    );
  }
}
