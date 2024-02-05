import {container, singleton} from "tsyringe";

import {ParamDtoValidationDomain} from "../../domain/param-dto-validation.domain";
import {ParamDtoDomain} from "../../domain/param-dto.domain";
import {deepCopy} from "@lib/utils";
import {ParamDtoValidationAbstractBuilder} from "./param-dto-validation-abstract.builder";
import {CheckSupportedSignsService} from "../../service/check-supported-signs.service";
import {EQUAL_SIGN} from "../../../const/param-dto.const";
import {CheckCorrectPatternService} from "../../service/check-correct-pattern.service";

@singleton()
/**
 * The builder contains methods to build validation steps to the program args.
 */
export class ProgramArgsValidationBuilder implements ParamDtoValidationAbstractBuilder {
    paramDtoValidation: ParamDtoValidationDomain;

    paramDto: ParamDtoDomain | undefined;

    constructor(
        private readonly checkSupportedSigns: CheckSupportedSignsService,
        private readonly checkCorrectPattern: CheckCorrectPatternService
    ) {
        this.paramDtoValidation = container.resolve(ParamDtoValidationDomain);
    }

    buildParamDto(paramDto: ParamDtoDomain): ProgramArgsValidationBuilder {
        this.paramDto = deepCopy(paramDto);
        return this;
    }

    buildSupportedSignsValidation(): ProgramArgsValidationBuilder {
        const programArgs = this.paramDto?.programArgs;
        if (!programArgs) return this;
        const wrongIndexes = programArgs
            .map(programArg => ({
                name: programArg.baseValue.split(EQUAL_SIGN)[0],
                index: programArg.index
            }))
            .filter(programArg => !this.checkSupportedSigns.checkName(programArg.name))
            .map(programArg => programArg.index);
        if (wrongIndexes.length === 0) return this;
        this.paramDtoValidation.supportedSigns = false;
        this.paramDtoValidation.supportedSignsWrongIndexes = [...wrongIndexes];
        return this;
    }

    buildCorrectPatternValidation(): ProgramArgsValidationBuilder {
        const programArgs = this.paramDto?.programArgs;
        if (!programArgs) return this;
        const wrongIndexes = programArgs
            .map(programArg => ({
                name: programArg.baseValue.split(EQUAL_SIGN)[0],
                index: programArg.index,
                isAlias: programArg.isAlias
            }))
            .filter(programArg => {
                if (programArg.isAlias) {
                    return !this.checkCorrectPattern.checkAlias(programArg.name);
                }
                return !this.checkCorrectPattern.checkArgument(programArg.name);
            })
            .map(programArg => programArg.index);
        if (wrongIndexes.length === 0) return this;
        this.paramDtoValidation.correctPattern = false;
        this.paramDtoValidation.correctPatternWrongIndexes = [...wrongIndexes];
        return this;
    }

    buildCanExistValidation(): ProgramArgsValidationBuilder {
        return this;
    }

    buildCorrectOrderValidation(): ProgramArgsValidationBuilder {
        const programArgs = this.paramDto?.programArgs;
        if (!programArgs) return this;
        const program = this.paramDto?.program;
        const startIndex = program ? program.index : -1;
        const wrongIndexes = programArgs
            .filter(arg => arg.index <= startIndex)
            .map(arg => arg.index);
        if (wrongIndexes.length > 0) {
            this.paramDtoValidation.correctOrder = false;
            this.paramDtoValidation.correctOrderWrongIndexes = deepCopy(wrongIndexes);
        }
        return this;
    }

    build(): ParamDtoValidationDomain {
        return this.paramDtoValidation;
    }
}
