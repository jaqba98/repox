import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../parameter/src/model/validator/validator-domain.model";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainModel
} from "../../parameter/src/model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../parameter/src/model/param-domain/param-domain-validation.model";
import { GetParamDependency } from "../service/get-param-dependency";
import {
  ParamDependencyModel
} from "../../parameter/src/model/param-domain/param-dependency.model";
import { ProgramEnum } from "../../parameter/src/enum/program.enum";

/**
 * The validator is responsible for checking that the given command
 * contains all required arguments.
 */
@singleton()
export class ProgramContainsArguments
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependency,
    private readonly buildParamDomain: BuildParamDomainValidation
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
      ["You have not specified all required arguments for command!"],
      [
        "You have to specify required arguments.",
        `Missing arguments for program are: ${missingArgs}`
      ],
      paramDomain
    );
  }
}
