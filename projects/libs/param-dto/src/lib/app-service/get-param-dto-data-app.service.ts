import { singleton } from "tsyringe";
import {
  ParamDtoValidationModel
} from "../model/param-dto-validation.model";
import {
  ParamDtoStoreService
} from "../dom-service/store/param-dto-store.service";
import {
  ParamDtoEntityModel,
  ParamDtoModel
} from "../model/param-dto.model";
import {
  FindParamDtoEntityService
} from "../dom-service/finder/find-param-dto-entity.service";

@singleton()
/**
 * The service is responsible for give param DTO data
 * for other projects.
 */
export class GetParamDtoDataAppService {
  constructor(
    private readonly paramDtoStore: ParamDtoStoreService,
    private readonly findParamDtoEntity: FindParamDtoEntityService
  ) {
  }

  getParamDto(): ParamDtoModel {
    return this.paramDtoStore.getParamDto();
  }

  getParamDtoValidation(): ParamDtoValidationModel {
    return this.paramDtoStore.getParamDtoValidation();
  }

  getProgramArgs(
    programIndex: number,
    commandIndex: number
  ): Array<ParamDtoEntityModel> {
    return this.findParamDtoEntity.findProgramArgs(
      programIndex,
      commandIndex
    );
  }

  getCommandArgs(commandIndex: number): Array<ParamDtoEntityModel> {
    return this.findParamDtoEntity.findCommandArgs(commandIndex);
  }
}
