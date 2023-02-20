import { ParameterDtoModel } from "../../model/parameter-dto.model";
import {
  ParameterDtoValidationModel
} from "../../model/parameter-dto-validation.model";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { singleton } from "tsyringe";

@singleton()
/**
 * Check whether the user added only one command name for program.
 */
export class MustHaveOneCommandValidationService {
  validation(parameterDto: ParameterDtoModel): ParameterDtoValidationModel {
    const commands = parameterDto.parameters
      .filter(parameter => parameter.type === ParameterTypeEnum.command);
    if (commands.length === 0) {
      return {
        error: true,
        wrongIndexes: [],
        errors: ["You have not given any command for a given program!"],
        tips: ["Enter the command name after the program name."]
      };
    }
    if (commands.length === 1) {
      return { error: false, wrongIndexes: [], errors: [], tips: [] };
    }
    const wrongIndexes = commands.map(command => command.index);
    return {
      error: true,
      wrongIndexes,
      errors: [
        "You have given too many commands for a given program!",
        "You can only enter one command per program!"
      ],
      tips: ["Enter only one command name after the program name."]
    };
  }
}
