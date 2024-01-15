import {singleton} from "tsyringe";
import {type ParamDtoValidatorModel} from "../../model/param-dto-validator.model";
import {BuildParamDtoResultService} from "../builder/build-param-dto-result.service";
import {type ParamDtoEntityModel} from "../../model/param-dto.model";
import {type ParamDtoValidationModel} from "../../model/param-dto-validation.model";
import {ParamTypeEnum} from "@lib/param-dto";
import {ParamDtoStoreService} from "../store/param-dto-store.service";

@singleton()
/**
 * Check the given DTO parameters have correct pattern.
 */
export class ValidatorCorrectPatternService
    implements ParamDtoValidatorModel {
    constructor(
        private readonly paramDtoStore: ParamDtoStoreService,
        private readonly buildParamDtoResult: BuildParamDtoResultService
    ) {
    }

    run(): ParamDtoValidationModel {
        const paramDto = this.paramDtoStore.getParamDto();
        const wrongParamsDto = paramDto.params.filter(
            param => !this.checkParamPattern(param)
        );
        if (wrongParamsDto.length === 0) {
            return this.buildParamDtoResult.buildSuccess();
        }
        return this.buildParamDtoResult.buildError(
            wrongParamsDto,
            [`You have used incorrect parameter pattern!`],
            wrongParamsDto.map(param => this.getParamTip(param))
        );
    }

    private checkParamPattern(paramDto: ParamDtoEntityModel): boolean {
        const {baseValue, type, hasValue} = paramDto;
        switch (type) {
            case ParamTypeEnum.executor:
            case ParamTypeEnum.application:
                return true;
            case ParamTypeEnum.program:
            case ParamTypeEnum.command:
                return this.checkProgramAndCommand(baseValue);
            case ParamTypeEnum.argument:
                return this.checkArgument(hasValue, baseValue);
            case ParamTypeEnum.alias:
                return this.checkAlias(hasValue, baseValue);
            default:
                throw new Error(`Not supported parameter type`);
        }
    }

    private checkProgramAndCommand(paramBaseValue: string): boolean {
        return /^.*$/gm.test(paramBaseValue);
    }

    private checkArgument(paramHasValue: boolean, baseValue: string): boolean {
        return paramHasValue
            ? /^--[a-zA-Z0-9-]+=[a-zA-Z0-9-"'/`,.\s@*]+$/gm.test(baseValue)
            : /^--[a-zA-Z0-9-/]+$/gm.test(baseValue);
    }

    private checkAlias(paramHasValue: boolean, paramBaseValue: string): boolean {
        return paramHasValue
            ? /^-[a-zA-Z0-9-]=[a-zA-Z0-9-"'`,.\s@*]+$/gm.test(paramBaseValue)
            : /^-[a-zA-Z0-9-]$/gm.test(paramBaseValue);
    }

    private getParamTip(paramDto: ParamDtoEntityModel): string {
        const {type, baseValue} = paramDto;
        switch (type) {
            case ParamTypeEnum.program:
            case ParamTypeEnum.command:
                return this.buildCorrectPatternMessage(
                    baseValue,
                    `<name>`
                );
            case ParamTypeEnum.argument:
                return this.buildCorrectPatternMessage(
                    baseValue,
                    `--<name> or --<name>=<value>`
                );
            case ParamTypeEnum.alias:
                return this.buildCorrectPatternMessage(
                    baseValue,
                    `-<sign> or -<sign>=<value>`
                );
            default:
                throw new Error(`Not supported parameter type`);
        }
    }

    private buildCorrectPatternMessage(paramBaseValue: string, pattern: string): string {
        return `Correct pattern for ${paramBaseValue} is: ${pattern}`;
    }
}

// todo: refactor the code
