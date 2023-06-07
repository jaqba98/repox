import { singleton } from "tsyringe";
import {
  ParamDtoStoreService
} from "../dom-service/store/param-dto-store.service";
import {
  FindParamDtoEntityService
} from "../dom-service/finder/find-param-dto-entity.service";

@singleton()
/**
 * The service is responsible for give param DTO entities name
 * for other projects.
 */
export class GetParamDtoNameAppService {
  constructor(
    private readonly paramDtoStore: ParamDtoStoreService,
    private readonly findParamDtoEntity: FindParamDtoEntityService
  ) {
  }

  getProgramName(): string {
    const program = this.findParamDtoEntity.findPrograms().at(0);
    return program ? program.paramName : "";
  }

  getCommandName(): string {
    const command = this.findParamDtoEntity.findCommands().at(0);
    return command ? command.paramName : "";
  }
}
