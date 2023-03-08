import { singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto/param-dto.model";
import { ValidatorDtoModel } from "../../model/validator-dto/validator-dto.model";
import { ParamType } from "../../enum/param-dto-type";
import {
  ParamDtoValidationModel
} from "../../model/param-dto/param-dto-validation.model";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters have only one program.
 */
export class SingleProgramService implements ValidatorDtoModel {
  runValidator(paramsDto: ParamDtoModel): ParamDtoValidationModel {
    const programs = paramsDto.params.filter(
      paramDto => paramDto.paramType === ParamType.program
    );
    if (programs.length === 0) {
      return {
        isError: true,
        wrongIndexes: [],
        errors: ["You have not specified a program!"],
        tips: [
          "You have to specify a program.",
          "Pattern: repox <program> <arguments> <command> <arguments>"
        ]
      }
    }
    if (programs.length === 1) {
      return {
        isError: false,
        wrongIndexes: [],
        errors: [],
        tips: []
      };
    }
    return {
      isError: true,
      wrongIndexes: programs.map(program => program.index),
      errors: ["You have specified too many programs!"],
      tips: [
        "You have to specify only one program.",
        "Pattern: repox <program> <arguments> <command> <arguments>"
      ]
    }
  }
}
// todo: refactor