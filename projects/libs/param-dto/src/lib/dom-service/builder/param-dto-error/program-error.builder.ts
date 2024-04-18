import { container, singleton } from "tsyringe";

import { type ParamDtoErrorAbstractBuilder } from "./param-dto-error-abstract.builder";
import { ParamDtoError } from "../../domain/param-dto-error";
import { type ParamDtoValidation } from "../../domain/param-dto-validation";
import { deepCopy } from "@lib/utils";

@singleton()
/**
 * The builder contains methods to build error steps to the program.
 */
export class ProgramErrorBuilder implements ParamDtoErrorAbstractBuilder {
    paramDtoValidation: ParamDtoValidation | undefined;

    readonly paramDtoError: ParamDtoError;

    constructor () {
        this.paramDtoError = container.resolve(ParamDtoError);
    }

    buildParamDtoValidation (
        paramDtoValidation: ParamDtoValidation
    ): ParamDtoErrorAbstractBuilder {
        this.paramDtoValidation = deepCopy(paramDtoValidation);
        return this;
    }

    buildSupportedSignsErrors (): ParamDtoErrorAbstractBuilder {
        if (this.paramDtoValidation == null) return this;
        const { supportedSigns, supportedSignsWrongIndexes } = this.paramDtoValidation;
        if (!supportedSigns) {
            this.paramDtoError.supportedSignsErrors = {
                wrongParamIndexes: deepCopy(supportedSignsWrongIndexes),
                errors: [
                    "The specified program contains unsupported characters!"
                ],
                tips: [
                    "Specify a program containing only supported characters and run the command again.",
                    "Supported characters for the program are: [a-z], [A-Z], [0-9] and [-]."
                ]
            };
        }
        return this;
    }

    buildCorrectPatternErrors (): ParamDtoErrorAbstractBuilder {
        if (this.paramDtoValidation == null) return this;
        const { correctPattern, correctPatternWrongIndexes } = this.paramDtoValidation;
        if (!correctPattern) {
            this.paramDtoError.correctPatternErrors = {
                wrongParamIndexes: deepCopy(correctPatternWrongIndexes),
                errors: [
                    "The specified program has incorrect pattern!"
                ],
                tips: [
                    "Specify a program with correct pattern and run the command again.",
                    "Example of correct pattern for program is: test-program"
                ]
            };
        }
        return this;
    }

    buildCanExistErrors (): ParamDtoErrorAbstractBuilder {
        if (this.paramDtoValidation == null) return this;
        const { canExist, canExistWrongIndexes } = this.paramDtoValidation;
        if (!canExist) {
            this.paramDtoError.correctPatternErrors = {
                wrongParamIndexes: deepCopy(canExistWrongIndexes),
                errors: [
                    "The specified program can not exist!"
                ],
                tips: [
                    "Specify a command without program and run the command again."
                ]
            };
        }
        return this;
    }

    buildCorrectOrderErrors (): ParamDtoErrorAbstractBuilder {
        if (this.paramDtoValidation == null) return this;
        const { correctOrder, correctOrderWrongIndexes } = this.paramDtoValidation;
        if (!correctOrder) {
            this.paramDtoError.correctPatternErrors = {
                wrongParamIndexes: deepCopy(correctOrderWrongIndexes),
                errors: [
                    "The specified program has not correct order!"
                ],
                tips: [
                    "Specify the program at the beginning of the command and run the command again."
                ]
            };
        }
        return this;
    }

    build (): ParamDtoError {
        return this.paramDtoError;
    }
}
