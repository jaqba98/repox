import {singleton} from "tsyringe";
import {FindParamDtoEntityService} from "../dom-service/finder/find-param-dto-entity.service";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service is responsible for give param DTO entities name
 * for other projects.
 */
export class GetParamDtoNameAppService {
    constructor(private readonly findParamDtoEntity: FindParamDtoEntityService) {
    }

    getProgramName(): string {
        const program = this.findParamDtoEntity.findPrograms().at(0);
        return (program != null) ? program.paramName : EMPTY_STRING;
    }

    getCommandName(): string {
        const command = this.findParamDtoEntity.findCommands().at(0);
        return (command != null) ? command.paramName : EMPTY_STRING;
    }
}
