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
import {
  ParamDomainDepModel
} from "../../model/param-domain/param-domain-dep.model";
import { ArgumentEnum } from "../../enum/argument.enum";
import {
  CheckArgumentService
} from "../service/check-argument.service";
import {
  ParamDomainStoreService
} from "../store/param-domain-store.service";

@singleton()
/**
 * The validator is responsible for checking that the given program
 * arguments have correct value.
 */
export class ValidatorProgramArgIsCorrectValueService
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
    const programDep: ParamDomainDepModel = this.getParamDependency
      .getDependency(programName);
    const programArgs = programDep.args;
    const wrongArgs = paramDomain.program.args
      .filter(arg => arg.name !== ArgumentEnum.unknown)
      .map(arg => this.checkArgument.argumentValue(arg, programArgs))
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
