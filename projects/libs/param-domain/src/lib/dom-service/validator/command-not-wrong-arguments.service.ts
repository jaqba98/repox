/* eslint-disable @typescript-eslint/no-explicit-any */
import {singleton} from "tsyringe";
import {type ValidatorDomainModel} from "../../model/validator/validator-domain.model";
import {BuildParamDomainResultService} from "../builder/build-param-domain-result.service";
import {ParamDomainStoreService} from "../store/param-domain-store.service";
import {type BaseGetParamDepModel} from "@lib/model";
import {type ParamDomainValidationModel} from "../../model/param-domain/param-domain-validation.model";
import {type ParamDomainDepModel} from "@lib/param-domain";

@singleton()
/**
 * The validator is responsible for checking that the given command
 * does not contain wrong arguments.
 */
export class CommandNotWrongArgumentsService implements ValidatorDomainModel {
    constructor(
        private readonly buildParamDomain: BuildParamDomainResultService,
        private readonly paramDomainStore: ParamDomainStoreService
    ) {
    }

    runValidator(
        getParamDepService: BaseGetParamDepModel
    ): ParamDomainValidationModel {
        const paramDomain = this.paramDomainStore.getParamDomain();
        const programName = paramDomain.program.name;
        const commandName = paramDomain.command.name;
        const programDep: ParamDomainDepModel = getParamDepService
            .getDependency(programName);
        const command = programDep.commands[commandName];
        const commandArgs = Object.values(command.args);
        const wrongArgs = paramDomain.command.args.filter((arg: any) =>
            commandArgs.find(commandArg => commandArg.name === arg.name) == null
        );
        if (wrongArgs.length === 0) {
            return this.buildParamDomain.buildSuccess();
        }
        const notExistedArgs = wrongArgs.map((arg: any) => arg.name).join(`,`);
        return this.buildParamDomain.buildError(
            [...wrongArgs.map((arg: any) => arg.index)],
            [`You have specified not existed arguments for command!`],
            [
                `Not existed arguments for command: ${notExistedArgs}`
            ]
        );
    }
}

// todo: refactor the code
