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
import {
  GetArgsForCommandService
} from "../service/get-args-for-command.service";

@singleton()
export class ArgsSupportedByCommandService
  implements RunParamDomainModel {
  constructor(
    private readonly getArgsForCommand: GetArgsForCommandService
  ) {
  }

  run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
    const args = this.getArgsForCommand
      .getArgs(<any>paramsDomain.command.name);
    const wrongArgs = paramsDomain.command.args.filter(arg => !args.includes(<any>arg.name));
    return wrongArgs.length === 0 ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: wrongArgs.map(arg => arg.index),
        errors: [
          "The given arguments are not supported by command!"
        ],
        tips: [
          "Check the documentation and enter an existing arguments for given command."
        ]
      };
  }
}
