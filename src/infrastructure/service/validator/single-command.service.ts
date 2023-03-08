import { singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto/param-dto.model";
import { ValidatorDtoModel } from "../../model/validator-dto/validator-dto.model";
import { ParamType } from "../../enum/param-dto-type";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters have only one command.
 */
export class SingleCommandService implements ValidatorDtoModel {
  runValidator(paramsDto: ParamDtoModel): ParamsDtoValidatorModel {
    const commands = paramsDto.params.filter(
      paramDto => paramDto.paramType === ParamType.command
    );
    if (commands.length === 0) {
      return {
        isError: true,
        wrongIndexes: [],
        errors: [
          "You have not specified any command for the given program!"
        ],
        tips: [
          "You have to specify a command for the given program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ]
      }
    }
    if (commands.length === 1) {
      return {
        isError: false,
        wrongIndexes: [],
        errors: [],
        tips: []
      };
    }
    return {
      isError: true,
      wrongIndexes: commands.map(command => command.index),
      errors: [
        "You have specified too many command for the given program!"
      ],
      tips: [
        "You have to specify only one command for the given program.",
        "Pattern: repox <program> <arguments> <command> <arguments>"
      ]
    }
  }
}
// todo: refactor