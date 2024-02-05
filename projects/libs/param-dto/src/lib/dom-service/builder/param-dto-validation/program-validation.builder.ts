import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {CheckSupportedSignsService} from "../../service/check-supported-signs.service";
import {CheckCorrectPatternService} from "../../service/check-correct-pattern.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor(
        private readonly checkSupportedSigns: CheckSupportedSignsService,
        private readonly checkCorrectPattern: CheckCorrectPatternService
    ) {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): ProgramValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): ProgramValidationBuilder {
        const program = this.paramDto?.program;
        if (!program) return this;
        if (this.checkSupportedSigns.checkName(program.baseValue)) return this;
        this.paramDtoValidation.supportedSigns = false;
        this.paramDtoValidation.supportedSignsWrongIndexes = [program.index];
        return this;
    }

    buildCorrectPatternValidation(): ProgramValidationBuilder {
        const program = this.paramDto?.program;
        if (!program) return this;
        if (this.checkCorrectPattern.checkProgramAndCommand(program.baseValue)) {
            return this;
        }
        this.paramDtoValidation.correctPattern = false;
        this.paramDtoValidation.correctPatternWrongIndexes = [program.index];
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
