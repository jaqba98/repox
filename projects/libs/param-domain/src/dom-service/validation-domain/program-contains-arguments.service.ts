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
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";

@singleton()
/**
 * The validator is responsible for checking that the given program
 * contains all required arguments.
 */
export class ProgramContainsArgumentsService
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependencyService,
    private readonly buildParamDomain: BuildParamDomainResultService
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
  ): ParamDomainValidationModel {
    const programName: ProgramEnum = paramDomain.program.name;
    const programDep: ParamDependencyModel = this.getParamDependency
      .getDependency(programName);
    const programArgs = programDep.args;
    const wrongArgs = Object.values(programArgs)
      .filter(programArg => programArg.required)
      .filter(programArg => !paramDomain.program.args
        .find(arg => arg.name === programArg.name)
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    const missingArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [],
      ["You have not specified all required arguments for program!"],
      [
        "You have to specify required arguments.",
        `Missing arguments for program are: ${missingArgs}`
      ],
      paramDomain
    );
  }
}
