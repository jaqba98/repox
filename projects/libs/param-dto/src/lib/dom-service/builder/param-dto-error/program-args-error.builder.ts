import {container, singleton} from "tsyringe";

import {ParamDtoErrorAbstractBuilder} from "./param-dto-error-abstract.builder";
import {ParamDtoError} from "../../domain/param-dto-error";
import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The builder contains methods to build error steps to the program arguments.
 */
export class ProgramArgsErrorBuilder implements ParamDtoErrorAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain | undefined;

    readonly paramDtoError: ParamDtoError;

    constructor() {
        this.paramDtoError = container.resolve(ParamDtoError);
    }

    buildParamDtoValidation(
        paramDtoValidation: ParamDtoValidationDomain
    ): ParamDtoErrorAbstractBuilder {
        this.paramDtoValidation = deepCopy(paramDtoValidation)
        return this;
    }

    buildSupportedSignsErrors(): ParamDtoErrorAbstractBuilder {
        if (!this.paramDtoValidation) return this;
        const {supportedSigns, supportedSignsWrongIndexes} = this.paramDtoValidation;
        if (!supportedSigns) {
            this.paramDtoError.supportedSignsErrors = {
                wrongParamIndexes: deepCopy(supportedSignsWrongIndexes),
                errors: [
                    "The specified program arguments contain unsupported characters!"
                ],
                tips: [
                    "Remember! The program argument value may contain an unsupported character!",
                    "Specify a program arguments containing only supported characters and run the command again.",
                    "Supported characters for the program arguments are: [a-z], [A-Z], [0-9] and [-]."
                ]
            };
        }
        return this;
    }

    buildCorrectPatternErrors(): ParamDtoErrorAbstractBuilder {
        if (!this.paramDtoValidation) return this;
        const {correctPattern, correctPatternWrongIndexes} = this.paramDtoValidation;
        if (!correctPattern) {
            this.paramDtoError.correctPatternErrors = {
                wrongParamIndexes: deepCopy(correctPatternWrongIndexes),
                errors: [
                    "The specified program arguments have incorrect pattern!"
                ],
                tips: [
                    "Specify a program arguments with correct pattern and run the command again.",
                    "Example of correct pattern for program arguments are:",
                    `1) --arg1, --arg1=test, --arg1="test", --arg1='test', --arg1=\`test\``,
                    `2) -a, -a=test, -a="test", -a='test', -a=\`test\``,
                ]
            };
        }
        return this;
    }

    buildCanExistErrors(): ParamDtoErrorAbstractBuilder {
        if (!this.paramDtoValidation) return this;
        const {canExist, canExistWrongIndexes} = this.paramDtoValidation;
        if (!canExist) {
            this.paramDtoError.correctPatternErrors = {
                wrongParamIndexes: deepCopy(canExistWrongIndexes),
                errors: [
                    "The specified program arguments can not exist!"
                ],
                tips: [
                    "Specify a command without program arguments and run the command again."
                ]
            };
        }
        return this;
    }

    buildCorrectOrderErrors(): ParamDtoErrorAbstractBuilder {
        if (!this.paramDtoValidation) return this;
        const {correctOrder, correctOrderWrongIndexes} = this.paramDtoValidation;
        if (!correctOrder) {
            this.paramDtoError.correctPatternErrors = {
                wrongParamIndexes: deepCopy(correctOrderWrongIndexes),
                errors: [
                    "The specified program arguments have not correct order!"
                ],
                tips: [
                    "Specify the program args after the program and run the command again."
                ]
            };
        }
        return this;
    }

    build(): ParamDtoError {
        return this.paramDtoError;
    }
}
