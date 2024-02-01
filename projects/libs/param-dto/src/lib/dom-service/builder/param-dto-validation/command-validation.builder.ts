import {container} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";

export class CommandValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor() {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): CommandValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): CommandValidationBuilder {
        return this;
    }

    buildCorrectPatternValidation(): CommandValidationBuilder {
        return this;
    }

    buildCanExistValidation(): CommandValidationBuilder {
        return this;
    }

    buildCorrectOrderValidation(): CommandValidationBuilder {
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}

// import {container, singleton} from "tsyringe";
//
// import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
// import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
// import {ParamDtoDomain} from "../../domain/param-dto.domain";
// import {CheckBaseValueService} from "../../service/check-base-value.service";
//
// @singleton()
// /**
//  * The builder contains methods to build validation steps to the command.
//  */
// export class CommandValidationBuilder implements ParamDtoValidationAbstractBuilder {
//     readonly paramDtoValid: ParamDtoValidationDomain;
//
//     constructor(private readonly checkBaseValue: CheckBaseValueService) {
//         this.paramDtoValid = container.resolve(ParamDtoValidationDomain);
//     }
//
//     buildSupportedSignsValid(_paramDto: ParamDtoDomain): CommandValidationBuilder {
//         // const {baseValue, index} = paramDto.command;
//         // if (baseValue === "" && index === -1) return this;
//         // if (this.checkBaseValue.checkBaseBaseValueSupportedSigns(baseValue)) return this;
//         // this.paramDtoValid.supportedSigns = false;
//         // this.paramDtoValid.supportedSignsWrongIndexes = [index];
//         return this;
//     }
//
//     buildCorrectPatternValid(_paramDto: ParamDtoDomain): CommandValidationBuilder {
//         // const {baseValue, index} = paramDto.command;
//         // if (baseValue === "" && index === -1) return this;
//         // if (this.checkBaseValue.checkBaseBaseValueCorrectPattern(baseValue)) return this;
//         // this.paramDtoValid.correctPattern = false;
//         // this.paramDtoValid.correctPatternWrongIndexes = [index];
//         return this;
//     }
//
//     buildCanExistValid(_paramDto: ParamDtoDomain): CommandValidationBuilder {
//         // const {baseValue, index} = paramDto.program;
//         // if (baseValue === "" && index === -1) {
//         //     this.paramDtoValid.canExist = false;
//         //     this.paramDtoValid.canExistWrongIndexes = [paramDto.command.index];
//         // }
//         return this;
//     }
//
//     buildCorrectOrderValid(_paramDto: ParamDtoDomain): CommandValidationBuilder {
//         // const {baseValue, index} = paramDto.command;
//         // if (baseValue === "" && index === -1) return this;
//         // if (baseValue !== "" && index > paramDto.program.index) return this;
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