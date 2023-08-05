import { singleton } from "tsyringe";
import { type ParamDtoModel } from "../../model/param-dto.model";
import {
  type ParamDtoValidationModel
} from "../../model/param-dto-validation.model";

@singleton()
/**
 * The service is responsible for store parameters DTO data
 * given directly from the command line and validation DTO result.
 */
export class ParamDtoStoreService {
  private paramDto: ParamDtoModel | undefined;
  private paramDtoValidation: ParamDtoValidationModel | undefined;

  setParamDto (paramDto: ParamDtoModel): void {
    this.paramDto = paramDto;
  }

  getParamDto (): ParamDtoModel {
    if (this.paramDto === undefined) {
      throw new Error(`The param dto store is undefined!`);
    }
    return this.paramDto;
  }

  setParamDtoValidation (
    paramDtoValidation: ParamDtoValidationModel
  ): void {
    this.paramDtoValidation = paramDtoValidation;
  }

  getParamDtoValidation (): ParamDtoValidationModel {
    if (this.paramDtoValidation === undefined) {
      throw new Error(`The param dto validation store is undefined!`);
    }
    return this.paramDtoValidation;
  }
}
