import {singleton} from "tsyringe";

import {ParamDtoValidationModel} from "../model/param-dto-validation.model";
import {ParamDtoStoreService} from "../dom-service/store/param-dto-store.service";
import {ParamDtoEntityModel} from "../model/param-dto.model";
import {ParamDtoFinderService} from "../dom-service/finder/param-dto-finder.service";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/** The service is responsible for give param DTO data for other projects. */
export class GetParamDtoAppService {
    constructor(
        private readonly paramDtoStore: ParamDtoStoreService,
        private readonly paramDtoFinder: ParamDtoFinderService
    ) {
    }

    getParamDtoValidation(): ParamDtoValidationModel {
        return this.paramDtoStore.getParamDtoValidation();
    }

    getProgramArgs(programIndex: number, commandIndex: number): ParamDtoEntityModel[] {
        return this.paramDtoFinder.findProgramArgs(programIndex, commandIndex);
    }

    getCommandArgs(commandIndex: number): ParamDtoEntityModel[] {
        return this.paramDtoFinder.findCommandArgs(commandIndex);
    }

    getProgramIndex(programName: string): number {
        const program = this.paramDtoFinder.findPrograms()[0];
        const programIndex: number = (program !== null) ? program.index : -1;
        return programName === EMPTY_STRING ? this.paramDtoFinder.findApplication().index : programIndex;
    }

    getCommandIndex(commandName: string): number {
        const command = this.paramDtoFinder.findCommands()[0];
        const commandIndex: number = (command !== null) ? command.index : -1;
        return commandName === EMPTY_STRING ? this.paramDtoStore.getParamDto().params.length : commandIndex;
    }

    getProgramName(): string {
        const program = this.paramDtoFinder.findPrograms()[0];
        return (program !== null) ? program.name : EMPTY_STRING;
    }

    getCommandName(): string {
        const command = this.paramDtoFinder.findCommands()[0];
        return (command !== null) ? command.name : EMPTY_STRING;
    }
}
