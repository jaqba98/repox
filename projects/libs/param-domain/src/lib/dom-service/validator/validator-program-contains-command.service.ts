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
 * The validator is responsible for checking
 * that given program contain given command.
 */
export class ValidatorProgramContainsCommandService
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
    if (programDep.commands[commandName]) {
      return this.buildParamDomain.buildSuccess();
    }
    return this.buildParamDomain.buildError(
      [paramDomain.command.index],
      ["The given command is not supported by the given program!"],
      [
        "You have to specify supported command name.",
        "Check the documentation to get full list of commands."
      ]
    );
  }
}
// todo: refactor