import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../model/validator/validator-domain.model";
import {
  BuildParamDomainResultService
} from "../builder/build-param-domain-result.service";
import {
  ParamDomainModel
} from "../../model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../model/param-domain/param-domain-validation.model";
import {
  ParamDependencyModel
} from "../../model/param-domain/param-dependency.model";
import { ProgramEnum } from "../../enum/program.enum";
import {
  GetParamDependencyService
} from "../service/get-param-dependency.service";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * does not contain wrong arguments.
 */
export class ProgramNotContainsWrongArgumentsService
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
    const programArgs = Object.values(programDep.args);
    const wrongArgs = paramDomain.program.args
      .filter(arg =>
        !programArgs.find(programArg => programArg.name === arg.name)
      );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain, []);
    }
    const notExistedArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["You have specified not existed arguments for command!"],
      [
        `Not existed arguments for program: ${notExistedArgs}`
      ],
      paramDomain,
      []
    );
  }
}
