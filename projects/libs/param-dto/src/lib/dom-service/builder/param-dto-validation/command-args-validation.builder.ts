import { container, singleton } from "tsyringe";

import { ParamDtoValidation } from "../../domain/param-dto-validation";
import { type ParamDto } from "../../domain/param-dto";
import { deepCopy } from "@lib/utils";
import { type ParamDtoValidationAbstractBuilder } from "./param-dto-validation-abstract.builder";
import { CheckSupportedSignsService } from "../../service/check-supported-signs.service";
import { EQUAL_SIGN } from "../../../const/param-dto.const";
import { CheckCorrectPatternService } from "../../service/check-correct-pattern.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command args.
 */
export class CommandArgsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidation;

    paramDto: ParamDto | undefined;

    constructor (
    private readonly checkSupportedSigns: CheckSupportedSignsService,
    private readonly checkCorrectPattern: CheckCorrectPatternService
    ) {
        this.paramDtoValidation = container.resolve(ParamDtoValidation);
    }

    buildParamDto (paramDto: ParamDto): this {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation (): this {
        const commandArgs = this.paramDto?.commandArgs;
        if (commandArgs == null) return this;
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

    buildCorrectPatternValidation (): this {
        const commandArgs = this.paramDto?.commandArgs;
        if (commandArgs == null) return this;
        const wrongIndexes = commandArgs
            .map(commandArg => ({
                name: commandArg.baseValue.split(EQUAL_SIGN)[0],
                index: commandArg.index,
                isAlias: commandArg.isAlias
            }))
            .filter(commandArg => {
                if (commandArg.isAlias) {
                    return !this.checkCorrectPattern.checkAlias(commandArg.name);
                }
                return !this.checkCorrectPattern.checkArgument(commandArg.name);
            })
            .map(programArg => programArg.index);
        if (wrongIndexes.length === 0) return this;
        this.paramDtoValidation.correctPattern = false;
        this.paramDtoValidation.correctPatternWrongIndexes = [...wrongIndexes];
        return this;
    }

    buildCanExistValidation (): this {
        const command = this.paramDto?.command;
        const commandArgs = this.paramDto?.commandArgs;
        if ((command == null) && (commandArgs != null)) {
            const indexes = commandArgs.map(arg => arg.index);
            this.paramDtoValidation.canExist = false;
            this.paramDtoValidation.canExistWrongIndexes = deepCopy(indexes);
        }
        return this;
    }

    buildCorrectOrderValidation (): this {
        const commandArgs = this.paramDto?.commandArgs;
        if (commandArgs == null) return this;
        const command = this.paramDto?.command;
        if (command == null) {
            const wrongIndexes = commandArgs.map(arg => arg.index);
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
            return this;
        }
        const { index } = command;
        const wrongIndexes = commandArgs
            .filter(arg => arg.index <= index)
            .map(arg => arg.index);
        if (wrongIndexes.length > 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
        }
        return this;
    }

    build (): ParamDtoValidation {
        return this.paramDtoValidation;
    }
}
