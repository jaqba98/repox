import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {CheckSupportedSignsService} from "../../service/check-supported-signs.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the command.
 */
export class CommandValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor(private readonly checkSupportedSigns: CheckSupportedSignsService) {
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

// export class CommandValidationBuilder implements ParamDtoValidationAbstractBuilder {
//     buildCorrectPatternValid(_paramDto: ParamDtoDomain): CommandValidationBuilder {
//         // const {baseValue, index} = paramDto.command;
//         // if (baseValue === "" && index === -1) return this;
//         // if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
//         // this.paramDtoValid.correctPattern = false;
//         // this.paramDtoValid.correctPatternWrongIndexes = [index];
//         return this;
//     }
// }
// todo: refactor the code