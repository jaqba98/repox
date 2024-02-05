import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {CheckSupportedSignsService} from "../../service/check-supported-signs.service";
import {EQUAL_SIGN} from "../../../const/param-dto.const";
import {CheckCorrectPatternService} from "../../service/check-correct-pattern.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command args.
 */
export class CommandArgsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor(
        private readonly checkSupportedSigns: CheckSupportedSignsService,
        private readonly checkCorrectPattern: CheckCorrectPatternService
    ) {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): CommandArgsValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): CommandArgsValidationBuilder {
        const commandArgs = this.paramDto?.commandArgs;
        if (!commandArgs) return this;
        const wrongIndexes = commandArgs
            .map(commandArg => ({
                name: commandArg.baseValue.split(EQUAL_SIGN)[0],
                index: commandArg.index
            }))
            .filter(commandArg => !this.checkSupportedSigns.checkName(commandArg.name))
            .map(commandArg => commandArg.index);
        if (wrongIndexes.length === 0) return this;
        this.paramDtoValidation.supportedSigns = false;
        this.paramDtoValidation.supportedSignsWrongIndexes = [...wrongIndexes];
        return this;
    }

    buildCorrectPatternValidation(): CommandArgsValidationBuilder {
        const commandArgs = this.paramDto?.commandArgs;
        if (!commandArgs) return this;
        const wrongIndexes = commandArgs
            .map(commandArg => ({
                name: commandArg.baseValue.split(EQUAL_SIGN)[0],
                index: commandArg.index,
                isAlias: commandArg.isAlias
            }))
            .filter(commandArg => {
                if (commandArg.isAlias) {
                    return this.checkCorrectPattern.checkAlias(commandArg.name);
                }
                return this.checkCorrectPattern.checkArgument(commandArg.name);
            })
            .map(programArg => programArg.index);
        if (wrongIndexes.length === 0) return this;
        this.paramDtoValidation.correctPattern = false;
        this.paramDtoValidation.correctPatternWrongIndexes = [...wrongIndexes];
        return this;
    }

    buildCanExistValidation(): CommandArgsValidationBuilder {
        const command = this.paramDto?.command;
        const commandArgs = this.paramDto?.commandArgs;
        if (!command && commandArgs) {
            const indexes = commandArgs.map(arg => arg.index);
            this.paramDtoValidation.canExist = false;
            this.paramDtoValidation.canExistWrongIndexes = deepCopy(indexes);
        }
        return this;
    }

    buildCorrectOrderValidation(): CommandArgsValidationBuilder {
        const commandArgs = this.paramDto?.commandArgs;
        if (!commandArgs) return this;
        const command = this.paramDto?.command;
        if (!command) {
            const wrongIndexes = commandArgs.map(arg => arg.index);
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
            return this;
        }
        const {index} = command;
        const wrongIndexes = commandArgs
            .filter(arg => arg.index <= index)
            .map(arg => arg.index);
        if (wrongIndexes.length > 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
        }
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}
