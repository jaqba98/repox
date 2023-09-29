import {singleton} from "tsyringe";
import {type ParamDtoEntityModel} from "../model/param-dto.model";
import {FindParamDtoEntityService} from "../dom-service/finder/find-param-dto-entity.service";

@singleton()
/**
 * The service is responsible for give param DTO arguments
 * for other projects.
 */
export class GetParamDtoArgAppService {
    constructor(private readonly findParamDtoEntity: FindParamDtoEntityService) {
    }

    getProgramArgs(programIndex: number, commandIndex: number): ParamDtoEntityModel[] {
        return this.findParamDtoEntity.findProgramArgs(programIndex, commandIndex);
    }

    getCommandArgs(commandIndex: number): ParamDtoEntityModel[] {
        return this.findParamDtoEntity.findCommandArgs(commandIndex);
    }
}
