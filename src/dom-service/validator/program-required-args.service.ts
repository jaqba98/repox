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

@singleton()
export class ProgramRequiredArgsService
  implements RunParamDomainModel {
  constructor(
    private readonly getRequiredArgsForProgram: GetRequiredArgsForProgramService
  ) {
  }

  run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
    const args = this.getRequiredArgsForProgram
      .getRequiredArgs(<any>paramsDomain.program.name);
    const wrongArgs = args
      .filter(arg => !paramsDomain.program.args.find(arg2 => arg2.name === arg.argument || arg2.name === arg.alias))
      .map(arg => arg.argument);
    return wrongArgs.length === 0 ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: [],
        errors: [
          "Nie podałeś wymaganych argumentów dla proggramu!"
        ],
        tips: [
          `Dodaj brakujace parametry dla programu: ${wrongArgs}`
        ]
      };
  }
}
