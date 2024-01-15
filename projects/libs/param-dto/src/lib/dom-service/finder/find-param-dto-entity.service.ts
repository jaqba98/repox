import {singleton} from "tsyringe";
import {type ParamDtoEntityModel} from "../../model/param-dto.model";
import {ParamTypeEnum} from "@lib/param-dto";
import {ParamDtoStoreService} from "../store/param-dto-store.service";

@singleton()
/**
 * Find all types of entities from the param DTO model.
 */
export class FindParamDtoEntityService {
    constructor(private readonly paramDtoStore: ParamDtoStoreService) {
    }

    findApplication(): ParamDtoEntityModel {
        const application = this.paramDtoStore.getParamDto().params.find(
            param => param.type === ParamTypeEnum.application
        );
        if (application == null) {
            throw new Error(`Application cannot be undefined!`);
        }
        return application;
    }

    findPrograms(): ParamDtoEntityModel[] {
        return this.paramDtoStore.getParamDto().params.filter(param => param.type === ParamTypeEnum.program);
    }

    findCommands(): ParamDtoEntityModel[] {
        return this.paramDtoStore.getParamDto().params.filter(param => param.type === ParamTypeEnum.command);
    }

    findProgramArgs(programIndex: number, commandIndex: number): ParamDtoEntityModel[] {
        return this.paramDtoStore.getParamDto().params
            .filter(param => param.type === ParamTypeEnum.argument || param.type === ParamTypeEnum.alias)
            .filter(param => param.index > programIndex && param.index < commandIndex);
    }

    findCommandArgs(commandIndex: number): ParamDtoEntityModel[] {
        return this.paramDtoStore.getParamDto().params
            .filter(param => param.type === ParamTypeEnum.argument || param.type === ParamTypeEnum.alias)
            .filter(param => param.index > commandIndex);
    }
}

// todo: refactor the code
