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
import { BaseGetParamDepModel } from "@lib/model";

@singleton()
/**
 * The validator is responsible for checking that the given program
 * contains all required arguments.
 */
export class ValidatorProgramContainsArgumentsService
  implements ValidatorDomainModel {
  constructor(
    private readonly buildParamDomain: BuildParamDomainResultService,
    private readonly paramDomainStore: ParamDomainStoreService
  ) {
  }

  runValidator(
    getParamDependency: BaseGetParamDepModel
  ): ParamDomainValidationModel {
    const paramDomain = this.paramDomainStore.getParamDomain();
    const programName = paramDomain.program.name;
    const programDep: ParamDomainDepModel = getParamDependency
      .getDependency(programName);
    const programArgs = programDep.args;
    const wrongArgs = Object.values(programArgs)
      .filter(programArg => programArg.required)
      .filter(programArg => !paramDomain.program.args
        .find(arg => arg.name === programArg.name)
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    const missingArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [],
      ["You have not specified all required arguments for program!"],
      [
        "You have to specify required arguments.",
        `Missing arguments for program are: ${missingArgs}`
      ]
    );
  }
}
// todo: refactor
