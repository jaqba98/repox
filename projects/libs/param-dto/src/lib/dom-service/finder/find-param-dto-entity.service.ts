import { singleton } from "tsyringe";
import { type ParamDtoEntityModel } from "../../model/param-dto.model";
import { ParamTypeEnum } from "../../enum/param-type.enum";
import {
  ParamDtoStoreService
} from "../store/param-dto-store.service";

@singleton()
/**
 * Find all types of entities from the param DTO model.
 */
export class FindParamDtoEntityService {
  constructor (private readonly paramDtoStore: ParamDtoStoreService) {
  }

  findApplication (): ParamDtoEntityModel {
    const application = this.paramDtoStore.getParamDto().params.find(
      param => param.paramType === ParamTypeEnum.application
    );
    if (application == null) {
      throw new Error(`Application cannot be undefined!`);
    }
    return application;
  }

  findPrograms (): ParamDtoEntityModel[] {
    return this.paramDtoStore.getParamDto().params.filter(
      param => param.paramType === ParamTypeEnum.program
    );
  }

  findCommands (): ParamDtoEntityModel[] {
    return this.paramDtoStore.getParamDto().params.filter(
      param => param.paramType === ParamTypeEnum.command
    );
  }

  findProgramArgs (
    programIndex: number,
    commandIndex: number
  ): ParamDtoEntityModel[] {
    return this.paramDtoStore.getParamDto().params
      .filter(param =>
        param.paramType === ParamTypeEnum.argument ||
        param.paramType === ParamTypeEnum.alias
      )
      .filter(param =>
        param.paramIndex > programIndex &&
        param.paramIndex < commandIndex
      );
  }

  findCommandArgs (commandIndex: number): ParamDtoEntityModel[] {
    return this.paramDtoStore.getParamDto().params
      .filter(param =>
        param.paramType === ParamTypeEnum.argument ||
        param.paramType === ParamTypeEnum.alias
      )
      .filter(param => param.paramIndex > commandIndex);
  }
}
// todo: refactor the file
