import {singleton} from "tsyringe";

import {ParamDtoEntityModel} from "../../model/param-dto.model";
import {ParamTypeEnum} from "../../enum/param-type.enum";
import {ParamDtoStoreService} from "../store/param-dto-store.service";
import {ALIAS_PREFIX, ARGUMENT_PREFIX} from "../../const/param-dto.const";

@singleton()
/** Find all types of entities from the param DTO model. */
export class ParamDtoFinderService {
    constructor(private readonly paramDtoStore: ParamDtoStoreService) {
    }

    findApplication(): ParamDtoEntityModel {
        const application = this.paramDtoStore.getParamDto().params
            .find(param => param.type === ParamTypeEnum.application);
        if (!application) throw new Error("Application cannot be undefined!");
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

    findArgumentsInRange(argv: string[], startIndex: number, endIndex: number): string[] {
        const result = [];
        for (let i = startIndex; i < endIndex; i++) {
            result.push(argv[i]);
        }
        return result;
    }

    findCommandIndex(argv: string[], programIndex: number): number {
        if (programIndex === -1) return -1;
        if (argv.length < 3) return -1;
        for (let i = (programIndex + 1); i < argv.length; i++) {
            if (this.getParamType(argv[i], i)) return i;
        }
        return -1;
    }

    private getParamType(arg: string, index: number): boolean {
        if (index === 0) return false;
        if (index === 1) return false;
        if (index === 2) return false;
        if (arg.startsWith(ARGUMENT_PREFIX)) return false;
        if (arg.startsWith(ALIAS_PREFIX)) return false;
        return true;
    }
}

// todo: refactor the code