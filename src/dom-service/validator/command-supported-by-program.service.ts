import {
  RunParamDomainModel
} from "../../model/run-param-domain.model";
import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "../../model/param-domain.model";
import { singleton } from "tsyringe";
import { CommandEnum, } from "../../enum/command.enum";
import {
  GetCommandForProgramService
} from "../service/get-command-for-program.service";

@singleton()
export class CommandSupportedByProgramService
  implements RunParamDomainModel {
  constructor(
    private readonly getCommandForProgram: GetCommandForProgramService
  ) {
  }
  run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
    const commands = this.getCommandForProgram
      .getCommands(<any>paramsDomain.program.name);
    const isSupported = commands.includes(<any>paramsDomain.command.name);
    return isSupported ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: [paramsDomain.command.index],
        errors: [
          "The given command is not supported by program!"
        ],
        tips: [
          "Check the documentation and enter an existing command for given program."
        ]
      };
  }
}
