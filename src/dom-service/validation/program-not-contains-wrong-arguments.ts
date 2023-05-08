import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator-domain/validator-domain-model";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain-model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation-model";
import { GetParamDependency } from "../service/get-param-dependency";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency-model";
import { Program } from "../../enum/program";

/**
 * The validator is responsible for checking that the given program
 * does not contain wrong arguments.
 */
@singleton()
export class ProgramNotContainsWrongArguments
  implements ValidatorDomainModel {
  constructor(
    private readonly getParamDependency: GetParamDependency,
    private readonly buildParamDomain: BuildParamDomainValidation
  ) {
  }

  runValidator(
    paramDomain: ParamDomainModel,
  ): ParamDomainValidationModel {
    const programName: Program = paramDomain.program.name;
    const programDep: ParamDependencyModel = this.getParamDependency
      .getDependency(programName);
    const programArgs = Object.values(programDep.args);
    const wrongArgs = paramDomain.program.args
      .filter(arg =>
        !programArgs.find(programArg => programArg.name === arg.name)
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    const notExistedArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["You have specified not existed arguments for program!"],
      [
        `Not existed arguments for program: ${notExistedArgs}`
      ],
      paramDomain
    );
  }
}
