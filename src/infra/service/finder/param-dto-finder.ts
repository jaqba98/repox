import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../model/param-dto/param-dto-model";
import { ParamType } from "../../enum/param-type";

/**
 * Find all types of entities from the param dto model.
 */
@singleton()
export class ParamDtoFinder {
  findApplication(
    paramDto: ParamDtoModel
  ): ParamDtoEntityModel {
    const application = paramDto.params
      .find(param => param.paramType === ParamType.application);
    if (!application) {
      throw new Error("Application cannot be undefined!");
    }
    return application;
  }

  findProgram(
    paramDto: ParamDtoModel
  ): ParamDtoEntityModel | undefined {
    return paramDto.params
      .find(param => param.paramType === ParamType.program);
  }

  findCommand(
    paramDto: ParamDtoModel
  ): ParamDtoEntityModel | undefined {
    return paramDto.params
      .find(param => param.paramType === ParamType.command);
  }

  findProgramArgs(
    paramDto: ParamDtoModel,
    programIndex: number,
    commandIndex: number
  ): Array<ParamDtoEntityModel> {
    return paramDto.params
      .filter(param =>
        param.paramType === ParamType.argument ||
        param.paramType === ParamType.alias
      )
      .filter(param =>
        param.paramIndex > programIndex &&
        param.paramIndex < commandIndex
      )
  }

  findCommandArgs(
    paramDto: ParamDtoModel,
    commandIndex: number
  ): Array<ParamDtoEntityModel> {
    return paramDto.params
      .filter(param =>
        param.paramType === ParamType.argument ||
        param.paramType === ParamType.alias
      )
      .filter(param => param.paramIndex > commandIndex)
  }
}
