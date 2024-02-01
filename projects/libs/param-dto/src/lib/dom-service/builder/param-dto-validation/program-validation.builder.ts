import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor() {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): ProgramValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): ProgramValidationBuilder {
        return this;
    }

    buildCorrectPatternValidation(): ProgramValidationBuilder {
        return this;
    }

    buildCanExistValidation(): ProgramValidationBuilder {
        return this;
    }

    buildCorrectOrderValidation(): ProgramValidationBuilder {
        const program = this.paramDto?.program;
        if (!program) return this;
        if (program.index !== 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = [program.index];
        }
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}

// export class ProgramValidationBuilder implements ParamDtoValidationAbstractBuilder {
//     buildSupportedSignsValid(_paramDto: ParamDtoDomain): ProgramValidationBuilder {
//         // const {baseValue, index} = paramDto.program;
//         // if (baseValue === "" && index === -1) return this;
//         // if (this.checkBaseValue.checkBaseBaseValueSupportedSigns(baseValue)) return this;
//         // this.paramDtoValid.supportedSigns = false;
//         // this.paramDtoValid.supportedSignsWrongIndexes = [index];
//         return this;
//     }
//
//     buildCorrectPatternValid(_paramDto: ParamDtoDomain): ProgramValidationBuilder {
//         // const {baseValue, index} = paramDto.program;
//         // if (baseValue === "" && index === -1) return this;
//         // if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
//         // this.paramDtoValid.correctPattern = false;
//         // this.paramDtoValid.correctPatternWrongIndexes = [index];
//         return this;
//     }
// }
// todo: refactor the code