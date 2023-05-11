import { singleton } from "tsyringe";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../../../parameter/src/model/param-dto/param-dto.model";
import { ParamTypeEnum } from "../../../parameter/src/enum/param-type.enum";

/**
 * Find all types of entities from the param dto model.
 */
@singleton()
export class ParamDtoFinder {
  findApplication(
    paramDto: ParamDtoModel
  ): ParamDtoEntityModel {
    const application = paramDto.params
      .find(param => param.paramType === ParamTypeEnum.application);
    if (!application) {
      throw new Error("Application cannot be undefined!");
    }
    return application;
  }

  findProgram(
    paramDto: ParamDtoModel
  ): ParamDtoEntityModel | undefined {
    return paramDto.params
      .find(param => param.paramType === ParamTypeEnum.program);
  }

  findCommand(
    paramDto: ParamDtoModel
  ): ParamDtoEntityModel | undefined {
    return paramDto.params
      .find(param => param.paramType === ParamTypeEnum.command);
  }

  findProgramArgs(
    paramDto: ParamDtoModel,
    programIndex: number,
    commandIndex: number
  ): Array<ParamDtoEntityModel> {
    return paramDto.params
      .filter(param =>
        param.paramType === ParamTypeEnum.argument ||
        param.paramType === ParamTypeEnum.alias
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
        param.paramType === ParamTypeEnum.argument ||
        param.paramType === ParamTypeEnum.alias
      )
      .filter(param => param.paramIndex > commandIndex)
  }
}
