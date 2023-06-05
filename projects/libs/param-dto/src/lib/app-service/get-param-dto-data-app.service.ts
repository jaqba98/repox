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

  getApplicationIndex(): number {
    return this.findParamDtoEntity.findApplication().paramIndex;
  }

  getProgramName(): string {
    const program = this.findParamDtoEntity.findPrograms().at(0);
    return program ? program.paramName : "";
  }

  getCommandName(): string {
    const command = this.findParamDtoEntity.findCommands().at(0);
    return command ? command.paramName : "";
  }

  getProgramIndex(): number {
    const program = this.findParamDtoEntity.findPrograms().at(0);
    return program ? program.paramIndex : -1;
  }

  getCommandIndex(): number {
    const command = this.findParamDtoEntity.findCommands().at(0);
    return command ? command.paramIndex : -1;
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
