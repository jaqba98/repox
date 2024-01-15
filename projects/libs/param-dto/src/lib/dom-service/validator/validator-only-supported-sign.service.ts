import {singleton} from "tsyringe";
import {type ParamDtoValidatorModel} from "../../model/param-dto-validator.model";
import {BuildParamDtoResultService} from "../builder/build-param-dto-result.service";
import {type ParamDtoEntityModel} from "../../model/param-dto.model";
import {type ParamDtoValidationModel} from "../../model/param-dto-validation.model";
import {ParamTypeEnum} from "@lib/param-dto";
import {ParamDtoStoreService} from "../store/param-dto-store.service";

@singleton()
/**
 * Check the given DTO parameters contain only supported signs.
 */
export class ValidatorOnlySupportedSignService
    implements ParamDtoValidatorModel {
    constructor(
        private readonly paramDtoStore: ParamDtoStoreService,
        private readonly buildParamDtoResult: BuildParamDtoResultService
    ) {
    }

    runValidator(): ParamDtoValidationModel {
        const paramDto = this.paramDtoStore.getParamDto();
        const wrongParamsDto = paramDto.params.filter(
            param => !this.checkParamSigns(param)
        );
        if (wrongParamsDto.length === 0) {
            return this.buildParamDtoResult.buildSuccess();
        }
        return this.buildParamDtoResult.buildError(
            wrongParamsDto,
            [`You have used not supported signs!`],
            wrongParamsDto.map(param => this.getParamTip(param))
        );
    }

    private checkParamSigns(paramDto: ParamDtoEntityModel): boolean {
        const {baseValue, type} = paramDto;
        switch (type) {
            case ParamTypeEnum.executor:
            case ParamTypeEnum.application:
                return true;
            case ParamTypeEnum.program:
            case ParamTypeEnum.command:
                return this.checkProgramAndCommand(baseValue);
            case ParamTypeEnum.argument:
            case ParamTypeEnum.alias:
                return this.checkArgumentAndAlias(baseValue);
            default:
                throw new Error(`Not supported parameter type!`);
        }
    }

    private checkProgramAndCommand(paramBaseValue: string): boolean {
        return /^[a-zA-Z0-9-]+$/gm.test(paramBaseValue);
    }

    private checkArgumentAndAlias(paramBaseValue: string): boolean {
        return /^[a-zA-Z0-9-="'`,/.\s@*]+$/gm.test(paramBaseValue);
    }

    private getParamTip(paramDto: ParamDtoEntityModel): string {
        const {baseValue, type} = paramDto;
        switch (type) {
            case ParamTypeEnum.program:
            case ParamTypeEnum.command:
                return this.buildSupportedSignsMessage(
                    baseValue,
                    `[a-Z] [0-9] [-]`
                );
            case ParamTypeEnum.argument:
            case ParamTypeEnum.alias:
                return this.buildSupportedSignsMessage(
                    baseValue,
                    `[a-Z] [0-9] [-] [=] ["] ['] [\`] [,] [/] [.] [@] [*] [space]`
                );
            default:
                throw new Error(`Not supported parameter type!`);
        }
    }

    private buildSupportedSignsMessage(paramBaseValue: string, signs: string): string {
        return `Supported signs for ${paramBaseValue} are: ${signs}`;
    }
}

// todo: refactor the code
