import { singleton } from "tsyringe";
import {
  ParamDtoValidationModel
} from "../model/param-dto-validation.model";
import {
  ParamDtoStoreService
} from "../dom-service/store/param-dto-store.service";

@singleton()
/**
 * The service is responsible for give param DTO data
 * for other projects.
 */
export class GetParamDtoDataAppService {
  constructor(
    private readonly paramDtoStore: ParamDtoStoreService
  ) {
  }

  getParamDtoValidation(): ParamDtoValidationModel {
    return this.paramDtoStore.getParamDtoValidation();
  }
}
