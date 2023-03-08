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
  GetRequiredArgsForProgramService
} from "../service/get-required-args-for-program.service";
import {
  GetRequiredArgsForCommandService
} from "../service/get-required-args-for-command.service";

@singleton()
export class CommandRequiredArgsService
  implements RunParamDomainModel {
  constructor(
    private readonly getRequiredArgsForCommand: GetRequiredArgsForCommandService
  ) {
  }

  run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
    const args = this.getRequiredArgsForCommand
      .getRequiredArgs(<any>paramsDomain.command.name);
    const wrongArgs = args
      .filter(arg => !paramsDomain.command.args.find(arg2 => arg2.name === arg.argument || arg2.name === arg.alias))
      .map(arg => arg.argument);
    return wrongArgs.length === 0 ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: [],
        errors: [
          "Nie podałeś wymaganych argumentów dla komendy!"
        ],
        tips: [
          `Dodaj brakujace parametry dla komendy: ${wrongArgs}`
        ]
      };
  }
}
