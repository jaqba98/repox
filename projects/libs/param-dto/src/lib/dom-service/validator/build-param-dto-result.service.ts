import {singleton} from "tsyringe";

import {ParamDtoEntityModel, ParamDtoModel} from "../../model/param-dto.model";
import {ParamDtoValidationModel} from "../../model/param-dto-validation.model";
import {ParamDtoStoreService} from "../store/param-dto-store.service";

@singleton()
/** Build the result of the param DTO validation for success and error. */
export class BuildParamDtoResultService {
    constructor(private readonly paramDtoStore: ParamDtoStoreService) {
    }

    buildSuccess(): ParamDtoValidationModel {
        const paramDto = this.paramDtoStore.getParamDto();
        return {
            success: true,
            wrongIndexes: [],
            baseValues: this.getBaseValues(paramDto),
            errors: [],
            tips: []
        };
    }

    buildError(wrongParamsDto: ParamDtoEntityModel[], errors: string[], tips: string[]): ParamDtoValidationModel {
        const paramDto = this.paramDtoStore.getParamDto();
        return {
            success: false,
            wrongIndexes: wrongParamsDto.map(item => item.index),
            baseValues: this.getBaseValues(paramDto),
            errors,
            tips
        };
    }

    private getBaseValues(paramDto: ParamDtoModel): string[] {
        return paramDto.params.map(param => param.baseValue);
    }
}

// todo: refactor the code