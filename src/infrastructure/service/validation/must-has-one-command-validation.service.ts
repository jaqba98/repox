import { ParameterDtoModel } from "../../model/parameter-dto.model";
import {
  ParameterDtoValidationModel
} from "../../model/parameter-dto-validation.model";
import { ParameterTypeEnum } from "../../enum/parameter-type.enum";
import { singleton } from "tsyringe";

@singleton()
/**
 * Check if the parameter dto has only one command.
 */
export class MustHasOneCommandValidationService {
  validation(parameterDto: ParameterDtoModel): ParameterDtoValidationModel {
    const commands = parameterDto.parameters
      .filter(parameter => parameter.type === ParameterTypeEnum.command);
    if (commands.length === 0) {
      return {
        error: true,
        wrongIndexes: [],
        errors: ["Nie podałeś komendy"],
        tips: []
      };
    }
    if (commands.length === 1) {
      return { error: false, wrongIndexes: [], errors: [], tips: [] };
    }
    return {
      error: true,
      wrongIndexes: commands.map(command => command.index),
      errors: ["Za dużo komend!"],
      tips: []
    };
  }
}
