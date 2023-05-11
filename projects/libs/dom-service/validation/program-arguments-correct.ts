import { singleton } from "tsyringe";
import {
  ValidatorDomainModel
} from "../../parameter/src/model/validator/validator-domain.model";
import {
  BuildParamDomainValidation
} from "../builder/build-param-domain-validation";
import {
  ParamDomainArgumentModel,
  ParamDomainModel
} from "../../parameter/src/model/param-domain/param-domain.model";
import {
  ParamDomainValidationModel
} from "../../parameter/src/model/param-domain/param-domain-validation.model";
import { GetParamDependency } from "../service/get-param-dependency";
import {
  ParamDependencyArgsModel,
  ParamDependencyModel
} from "../../parameter/src/model/param-domain/param-dependency.model";
import { ProgramEnum } from "../../parameter/src/enum/program.enum";
import { ArgumentEnum } from "../../parameter/src/enum/argument.enum";

/**
 * The validator is responsible for checking that the given command
 * arguments are correct.
 */
@singleton()
export class ProgramArgumentsCorrect
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
    const wrongArgs = paramDomain.program.args
      .filter(arg => arg.name !== ArgumentEnum.unknown)
      .filter(arg => !this.checkCommandArgs(arg, programArgs));
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess(paramDomain);
    }
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["Given arguments have not correct values!"],
      [
        "Check the documentation to get full list of arguments."
      ],
      paramDomain
    );
  }

  private checkCommandArgs(
    programArg: ParamDomainArgumentModel,
    programArgs: ParamDependencyArgsModel
  ): boolean {
    const depArg = programArgs[programArg.name];
    if (depArg.valueMode === "empty") {
      return programArg.values.length === 0;
    }
    if (depArg.valueMode === "single") {
      return programArg.values.length === 1;
    }
    return programArg.values.length > 1;
  }
}
