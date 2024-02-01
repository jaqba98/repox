import {container} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";

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
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}

// import {container, singleton} from "tsyringe";
//
// import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
// import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-builder";
// import {ParamDtoDomain} from "../../domain/param-dto.domain";
// import {CheckBaseValueService} from "../../service/check-base-value.service";
//
// @singleton()
// /**
//  * The builder contains methods to build validation steps to the program.
//  */
// export class ProgramValidationBuilder implements ParamDtoValidationAbstractBuilder {
//     readonly paramDtoValid: ParamDtoValidationDomain;
//
//     constructor(private readonly checkBaseValue: CheckBaseValueService) {
//         this.paramDtoValid = container.resolve(ParamDtoValidationDomain);
//     }
//
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
//
//     buildCanExistValid(_paramDto: ParamDtoDomain): ProgramValidationBuilder {
//         return this;
//     }
//
//     buildCorrectOrderValid(_paramDto: ParamDtoDomain): ProgramValidationBuilder {
//         // const {baseValue, index} = paramDto.program;
//         // if (baseValue === "" && index === -1) return this;
//         // if (baseValue !== "" && index === 0) return this;
//         // this.paramDtoValid.correctOrder = false;
//         // this.paramDtoValid.correctOrderWrongIndexes = [index];
//         return this;
//     }
//
//     build(): ParamDtoValidationDomain {
//         return this.paramDtoValid;
//     }
// }
// todo: refactor the code