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
 * The validator is responsible for checking
 * that given program contain given command.
 */
export class ValidatorProgramContainsCommandService
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
    if (programDep.commands[commandName] !== undefined) {
      return this.buildParamDomain.buildSuccess();
    }
    return this.buildParamDomain.buildError(
      [paramDomain.command.index],
      [`The given command is not supported by the given program!`],
      [
        `You have to specify supported command name.`,
        `Check the documentation to get full list of commands.`
      ]
    );
  }
}
