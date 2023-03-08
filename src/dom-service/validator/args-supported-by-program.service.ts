// todo: refactor
import {
  RunParamDomainModel
} from "../../model/run-param-domain.model";
import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "../../model/param-domain.model";
import { singleton } from "tsyringe";
import {
  GetCommandForProgramService
} from "../service/get-command-for-program.service";
import {
  GetArgsForProgramService
} from "../service/get-args-for-program.service";

@singleton()
export class ArgsSupportedByProgramService
  implements RunParamDomainModel {
  constructor(
    private readonly getArgsForProgram: GetArgsForProgramService
  ) {
  }

  run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
    const args = this.getArgsForProgram
      .getArgs(<any>paramsDomain.program.name);
    const wrongArgs = paramsDomain.program.args.filter(arg => !args.includes(<any>arg.name));
    return wrongArgs.length === 0 ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: wrongArgs.map(arg => arg.index),
        errors: [
          "The given arguments are not supported by program!"
        ],
        tips: [
          "Check the documentation and enter an existing arguments for given program."
        ]
      };
  }
}
