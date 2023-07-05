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
 * does not contain wrong arguments.
 */
export class ValidatorProgramNotWrongArgumentsService
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
    const programArgs = Object.values(programDep.args);
    const wrongArgs = paramDomain.program.args.filter(arg =>
      !programArgs.find(programArg => programArg.name === arg.name)
    );
    if (wrongArgs.length === 0) {
      return this.buildParamDomain.buildSuccess();
    }
    const notExistedArgs = wrongArgs.map(arg => arg.name).join(',');
    return this.buildParamDomain.buildError(
      [...wrongArgs.map(arg => arg.index)],
      ["You have specified not existed arguments for program!"],
      [
        `Not existed arguments for program: ${notExistedArgs}`
      ]
    );
  }
}
// todo: refactor
