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
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import { ProgramEnum } from "../../enum/program.enum";
import { CommandEnum } from "../../enum/command.enum";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";

@singleton()
/**
 * The validator is responsible for checking
 * that given program contain given command.
 */
export class ValidatorProgramContainsCommandService
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependencyService,
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator(): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    const programName: ProgramEnum = paramDomain.program.name;
    const commandName: CommandEnum = paramDomain.command.name;
    const programDep: ParamDependencyModel = this.getParamDependency
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
