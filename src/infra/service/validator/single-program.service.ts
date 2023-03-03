import { singleton } from "tsyringe";
import {
  ParamDtoModel,
  ParamsDtoValidatorModel
} from "../../model/param-dto.model";
import { RunValidatorModel } from "../../model/run-validator.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";

@singleton()
/**
 * The validator is responsible for checking that
 * the given dto parameters have only one program.
 */
export class SingleProgramService implements RunValidatorModel {
  run(paramsDto: ParamDtoModel): ParamsDtoValidatorModel {
    const programs = paramsDto.params.filter(
      paramDto => paramDto.paramType === ParamTypeEnum.program
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
