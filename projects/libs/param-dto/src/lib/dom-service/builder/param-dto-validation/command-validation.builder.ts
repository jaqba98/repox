import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {CheckSupportedSignsService} from "../../service/check-supported-signs.service";
import {CheckCorrectPatternService} from "../../service/check-correct-pattern.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command.
 */
export class CommandValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor(
        private readonly checkSupportedSigns: CheckSupportedSignsService,
        private readonly checkCorrectPattern: CheckCorrectPatternService
    ) {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): CommandValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): CommandValidationBuilder {
        const command = this.paramDto?.command;
        if (!command) return this;
        if (this.checkSupportedSigns.checkName(command.baseValue)) return this;
        this.paramDtoValidation.supportedSigns = false;
        this.paramDtoValidation.supportedSignsWrongIndexes = [command.index];
        return this;
    }

    buildCorrectPatternValidation(): CommandValidationBuilder {
        const command = this.paramDto?.command;
        if (!command) return this;
        if (this.checkCorrectPattern.checkProgramAndCommand(command.baseValue)) {
            return this;
        }
        this.paramDtoValidation.correctPattern = false;
        this.paramDtoValidation.correctPatternWrongIndexes = [command.index];
        return this;
    }

    buildCanExistValidation(): CommandValidationBuilder {
        const program = this.paramDto?.program;
        const command = this.paramDto?.command;
        if (!program && command) {
            this.paramDtoValidation.canExist = false;
            this.paramDtoValidation.canExistWrongIndexes = [command.index];
        }
        return this;
    }

    buildCorrectOrderValidation(): CommandValidationBuilder {
        const command = this.paramDto?.command;
        if (command && command.index === 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = [command.index];
        }
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}
