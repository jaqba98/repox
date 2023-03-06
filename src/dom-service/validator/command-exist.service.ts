import {
  RunParamDomainModel
} from "../../model/run-param-domain.model";
import {
  ParamDomainModel,
  ParamsDomainValidatorModel
} from "../../model/param-domain.model";
import { singleton } from "tsyringe";
import { CommandEnum, } from "../../enum/command.enum";

@singleton()
export class CommandExistService implements RunParamDomainModel {
  run(paramsDomain: ParamDomainModel): ParamsDomainValidatorModel {
    const commandExist = Object.values(CommandEnum)
      .map(item => item.toString())
      .includes(paramsDomain.command.name);
    return commandExist ?
      { isError: false, wrongIndexes: [], errors: [], tips: [] } :
      {
        isError: true,
        wrongIndexes: [paramsDomain.command.index],
        errors: [
          "You have given not existing command for given program!"
        ],
        tips: [
          "Check the documentation and enter an existing command for given program."
        ]
      };
  }
}
