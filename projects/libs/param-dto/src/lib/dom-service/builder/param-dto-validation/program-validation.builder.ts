import { container, singleton } from "tsyringe";

import { ParamDtoValidation } from "../../domain/param-dto-validation";
import { type ParamDto } from "../../domain/param-dto";
import { deepCopy } from "@lib/utils";
import { type ParamDtoValidationAbstractBuilder } from "./param-dto-validation-abstract.builder";
import { CheckSupportedSignsService } from "../../service/check-supported-signs.service";
import { CheckCorrectPatternService } from "../../service/check-correct-pattern.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program.
 */
export class ProgramValidationBuilder implements ParamDtoValidationAbstractBuilder {
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
        const program = this.paramDto?.program;
        if (program == null) return this;
        if (this.checkSupportedSigns.checkName(program.baseValue)) return this;
        this.paramDtoValidation.supportedSigns = false;
        this.paramDtoValidation.supportedSignsWrongIndexes = [program.index];
        return this;
    }

    buildCorrectPatternValidation (): this {
        const program = this.paramDto?.program;
        if (program == null) return this;
        if (this.checkCorrectPattern.checkProgramAndCommand(program.baseValue)) {
            return this;
        }
        this.paramDtoValidation.correctPattern = false;
        this.paramDtoValidation.correctPatternWrongIndexes = [program.index];
        return this;
    }

    buildCanExistValidation (): this {
        return this;
    }

    buildCorrectOrderValidation (): this {
        const program = this.paramDto?.program;
        if (program == null) return this;
        if (program.index !== 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = [program.index];
        }
        return this;
    }

    build (): ParamDtoValidation {
        return this.paramDtoValidation;
    }
}
