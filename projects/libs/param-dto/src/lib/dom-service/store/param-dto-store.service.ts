import {singleton} from "tsyringe";

import {ParamDtoModel} from "../../model/param-dto.model";
import {ParamDtoValidationModel} from "../../model/param-dto-validation.model";

@singleton()
/**
 * The service is responsible for store parameters DTO model
 * given directly from the command line and validation DTO result.
 */
export class ParamDtoStoreService {
    private paramDto?: ParamDtoModel;
    private paramDtoValidation?: ParamDtoValidationModel;

    setParamDto(paramDto: ParamDtoModel): void {
        this.paramDto = paramDto;
    }

    setParamDtoValidation(paramDtoValidation: ParamDtoValidationModel): void {
        this.paramDtoValidation = paramDtoValidation;
    }

    getParamDto(): ParamDtoModel {
        if (!this.paramDto) throw new Error("The param DTO store is not defined!");
        return this.paramDto;
    }

    getParamDtoValidation(): ParamDtoValidationModel {
        if (!this.paramDtoValidation) throw new Error("The param DTO validation store is not defined!");
        return this.paramDtoValidation;
    }
}

// todo: refactor the code