import {singleton} from "tsyringe";
import {GetParamDtoAppService} from "@lib/param-dto";
import {ParamDomainStoreService} from "../store/param-domain-store.service";
import {type KeyValueModel} from "@lib/model";
import {BuildParamNameService} from "./build-param-name.service";
import {type ParamDomainArgModel, type ParamDomainModel} from "@lib/param-domain";

@singleton()
/**
 * Build the parameter domain model.
 */
export class BuildParamDomainService {
    constructor(
        private readonly getParamDto: GetParamDtoAppService,
        private readonly buildParamName: BuildParamNameService,
        private readonly paramDomainStore: ParamDomainStoreService
    ) {
    }

    build(
        programEnums: KeyValueModel[],
        programAliasEnums: KeyValueModel[],
        commandEnums: KeyValueModel[],
        commandAliasEnums: KeyValueModel[],
        argumentEnums: KeyValueModel[],
        aliasEnums: KeyValueModel[]
    ): void {
        const programBaseName = this.getParamDto.getProgramName();
        const commandBaseName = this.getParamDto.getCommandName();
        const programIndex = this.getParamDto.getProgramIndex(programBaseName);
        const commandIndex = this.getParamDto.getCommandIndex(commandBaseName);
        const programName = this.buildParamName.buildProgramName(programBaseName, programEnums, programAliasEnums);
        const commandName = this.buildParamName.buildCommandName(commandBaseName, commandEnums, commandAliasEnums);
        const programArgs = this.getParamDto.getProgramArgs(programIndex, commandIndex);
        const commandArgs = this.getParamDto.getCommandArgs(commandIndex);
        const programDomainArgs = programArgs
            .map<ParamDomainArgModel>(programArg => ({
                baseName: programArg.baseValue,
                name: this.buildParamName.buildArgumentName(
                    programArg.type, programArg.name, argumentEnums, aliasEnums
                ),
                index: programArg.index,
                values: programArg.values,
                hasValue: programArg.hasValue,
                hasManyValues: programArg.hasManyValues
            }));
        const commandDomainArgs = commandArgs
            .map<ParamDomainArgModel>(programArg => ({
                baseName: programArg.baseValue,
                name: this.buildParamName.buildArgumentName(
                    programArg.type, programArg.name, argumentEnums, aliasEnums
                ),
                index: programArg.index,
                values: programArg.values,
                hasValue: programArg.hasValue,
                hasManyValues: programArg.hasManyValues
            }));
        const paramDomain: ParamDomainModel = {
            program: {
                baseName: programBaseName,
                name: programName,
                index: programIndex,
                args: programDomainArgs
            },
            command: {
                baseName: commandBaseName,
                name: commandName,
                index: commandIndex,
                args: commandDomainArgs
            }
        };
        this.paramDomainStore.setParamDomain(paramDomain);
    }
}

// todo: refactor the code
