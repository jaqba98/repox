import {singleton} from "tsyringe";
import {type ParamDtoValidatorModel} from "../../model/param-dto-validator.model";
import {BuildParamDtoResultService} from "../builder/build-param-dto-result.service";
import {FindParamDtoEntityService} from "../finder/find-param-dto-entity.service";
import {type ParamDtoValidationModel} from "../../model/param-dto-validation.model";

@singleton()
/**
 * Check the given DTO parameters have max one command
 * (0 or 1 if the program exist and 0 if the program not exist).
 */
export class ValidatorMaxOneCommandService
    implements ParamDtoValidatorModel {
    constructor(
        private readonly buildParamDtoResult: BuildParamDtoResultService,
        private readonly findParamDtoEntity: FindParamDtoEntityService
    ) {
    }

    run(): ParamDtoValidationModel {
        const program = this.findParamDtoEntity.findPrograms()[0];
        const commands = this.findParamDtoEntity.findCommands();
        if (program === undefined && commands.length > 0) {
            return this.buildParamDtoResult.buildError(
                commands,
                [`You have specified the command without any program!`],
                [
                    `You have to specify a program.`,
                    `Pattern: repox <program> <arguments> <program> <arguments>`
                ]
            );
        }
        if (program !== undefined && commands.length > 1) {
            return this.buildParamDtoResult.buildError(
                commands,
                [`You have specified too many commands!`],
                [
                    `You have to specify one command for the given program.`,
                    `Pattern: repox <program> <arguments> <program> <arguments>`
                ]
            );
        }
        return this.buildParamDtoResult.buildSuccess();
    }
}

// todo: refactor the code
