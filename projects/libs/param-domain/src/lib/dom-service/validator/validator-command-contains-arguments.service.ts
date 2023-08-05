import { singleton } from "tsyringe";
import {
  type ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";
import { type BaseGetParamDepModel } from "@lib/model";
import {
  type ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { type ParamDomainDepModel } from "@lib/param-domain";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * contains all required arguments.
 */
export class ValidatorCommandContainsArgumentsService
implements ValidatorDomainModel {
  constructor (
    private readonly buildParamDomain: BuildParamDomainResultService,
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
    const command = programDep.commands[commandName];
    const commandArgs = command.args;
    const wrongArgs = Object.values(commandArgs)
      .filter(commandArg => commandArg.required)
      .filter(commandArg => paramDomain.command.args
        .find(arg => arg.name === commandArg.name) == null
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    const missingArgs = wrongArgs.map(arg => arg.name).join(`,`);
    return this.buildParamDomain.buildError(
      [],
      [`You have not specified all required arguments for command!`],
      [
        `You have to specify required arguments.`,
        `Missing arguments for command are: ${missingArgs}`
      ]
    );
  }
}
