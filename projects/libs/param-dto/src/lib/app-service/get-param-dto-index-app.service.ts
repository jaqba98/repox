import { singleton } from "tsyringe";
import {
  ParamDtoStoreService
} from "../dom-service/store/param-dto-store.service";
import {
  FindParamDtoEntityService
} from "../dom-service/finder/find-param-dto-entity.service";

@singleton()
/**
 * The service is responsible for give param DTO entities index
 * for other projects.
 */
export class GetParamDtoIndexAppService {
  constructor(
    private readonly paramDtoStore: ParamDtoStoreService,
    private readonly findParamDtoEntity: FindParamDtoEntityService
  ) {
  }

  getProgramIndex(programName: string): number {
    const program = this.findParamDtoEntity.findPrograms().at(0);
    const programIndex: number = program ? program.paramIndex : -1;
    return programName === "" ?
      this.findParamDtoEntity.findApplication().paramIndex :
      programIndex;
  }

  getCommandIndex(commandName: string): number {
    const command = this.findParamDtoEntity.findCommands().at(0);
    const commandIndex: number = command ? command.paramIndex : -1;
    return commandName === "" ?
      this.paramDtoStore.getParamDto().params.length :
      commandIndex;
  }
}
